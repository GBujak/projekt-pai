package warsztat.warsztatserver.controllers

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import warsztat.warsztatserver.models.ApplicationUser
import warsztat.warsztatserver.models.payment.ServiceInvoice
import warsztat.warsztatserver.models.servicestorymodels.WorkDescription
import warsztat.warsztatserver.models.users.Employee
import warsztat.warsztatserver.models.util.CurrentUserUtil
import warsztat.warsztatserver.models.util.RestMessage
import warsztat.warsztatserver.repositories.ServiceInvoiceRepository
import warsztat.warsztatserver.repositories.ServiceRequestRepository
import java.util.*

class GenerateInvoiceRequest(
    val serviceId: Long,
    val buyer: String,
    val street: String,
    val postalCity: String,
)

class GetInvoiceRequest(val serviceId: Long)

class InvoiceRest (
    serviceInvoice: ServiceInvoice,
    val nr: String = invoiceIdDateToNumber(serviceInvoice.id, serviceInvoice.createdDate),
    val date: Date = serviceInvoice.createdDate,
    val buyer: String = serviceInvoice.buyer,
    val street: String = serviceInvoice.street,
    val postalCity: String = serviceInvoice.postalCity,

    val items: List<InvoiceCostItem> = serviceInvoice
        .service
        .serviceComments
        .flatMap { it.workDescriptions }
        .flatMap { workDescriptionToInvoiceItems(it) },
)

fun workDescriptionToInvoiceItems(workDescription: WorkDescription): List<InvoiceCostItem> {
    val result = mutableListOf<InvoiceCostItem>()

    result.add(InvoiceCostItem(
        name = workDescription.workName,
        cost = 20_00,
        ammount = workDescription.workHours,
        unit = "godzin",
        taxPercent = 5,
        type = InvoiceItemType.SERVICE.name.toLowerCase(),
    ))

    for (partUsage in workDescription.partUsages) {
        result.add(InvoiceCostItem(
            name = partUsage.carPart.name,
            cost = partUsage.carPart.price,
            ammount = partUsage.ammount,
            unit = "sztuk",
            taxPercent = 23,
            type = InvoiceItemType.RESOURCE.name.toLowerCase(),
        ))
    }

    return result.toList()
}

fun invoiceIdDateToNumber(id: Long, date: Date): String {
    val calendar = Calendar.getInstance()
    calendar.time = date
    val year = calendar.get(Calendar.YEAR)

    return "FV $id/$year"
}

enum class InvoiceItemType {
    SERVICE,
    RESOURCE,
}

class InvoiceCostItem (
    val name: String,
    val cost: Long,
    val ammount: Int,
    val unit: String,
    val taxPercent: Int,
    val type: String,
)

@RestController
@RequestMapping("/api/invoice")
class InvoiceController(
    val serviceInvoiceRepository: ServiceInvoiceRepository,
    val serviceRequestRepository: ServiceRequestRepository,
    val currentUserUtil: CurrentUserUtil,
) {
    @PostMapping("generate")
    fun generate(@RequestBody req: GenerateInvoiceRequest): RestMessage<Unit> {
        val user = currentUserUtil.getCurrentUser()

        val serviceOpt = serviceRequestRepository.findById(req.serviceId)
        if (serviceOpt.isEmpty) return RestMessage("Błąd: Nie ma usługi o takim id")
        val service = serviceOpt.get()

        if (user.id != service.submitter.id) return RestMessage("Błąd: Nie masz uprawnień")

        val invoice = ServiceInvoice(service, req.buyer, req.street, req.postalCity)
        serviceInvoiceRepository.save(invoice)

        return RestMessage("Ok")
    }

    @PostMapping("get")
    fun getInvoice(@RequestBody req: GetInvoiceRequest): RestMessage<InvoiceRest> {
        val user = currentUserUtil.getCurrentUser()
        val serviceOpt = serviceRequestRepository.findById(req.serviceId)
        if (serviceOpt.isEmpty) return RestMessage("Błąd: Nie ma usługi o takim id")
        val service = serviceOpt.get()

        if (user !is Employee && user.id != service.submitter.id)
            return RestMessage("Błąd: Nie masz uprawnień")

        val invoice = serviceInvoiceRepository.findByService(service)
        if (invoice == null) return RestMessage("Błąd: nie ma takiej faktury")

        return RestMessage("Ok", InvoiceRest(invoice))
    }
}