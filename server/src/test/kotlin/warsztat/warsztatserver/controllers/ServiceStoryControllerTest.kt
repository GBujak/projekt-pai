package warsztat.warsztatserver.controllers

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.mockito.Mockito.mock
import org.mockito.kotlin.mock
import org.mockito.kotlin.whenever
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder.on
import warsztat.warsztatserver.klient.Customer
import warsztat.warsztatserver.models.carmodels.Car
import warsztat.warsztatserver.models.carmodels.CarMake
import warsztat.warsztatserver.models.carmodels.CarModel
import warsztat.warsztatserver.models.servicestorymodels.ServiceRequest
import warsztat.warsztatserver.models.util.Address
import warsztat.warsztatserver.models.util.CurrentUserUtil
import warsztat.warsztatserver.repositories.CarRepository
import warsztat.warsztatserver.repositories.ServiceRequestRepository
import java.util.*

internal class ServiceStoryControllerTest {
    @Test
    fun createTest() {
        val user = Customer("customer", "test", "Jan Kowalski", "123", Address(
            "Kielce", "Sienkiewicza", 12
        ))

        val carMake = CarMake("Volkswagen")
        val carModel = CarModel("Golf", "Standard", carMake)

        val car = Car(2010, 10_000, carModel, user, id = 1)
        user.cars += car

        val mockServiceReqRepo = mock<ServiceRequestRepository>()
        whenever(mockServiceReqRepo.save(ServiceRequest("test", "test", user, Optional.of(car).get())))
            .thenReturn(ServiceRequest("test", "test", user, car, id = 1))

        val mockCurrentUserUtil = mock<CurrentUserUtil>()
        whenever(mockCurrentUserUtil.getCurrentUser()).thenReturn(user)

        val mockCarRepository = mock<CarRepository>()
        whenever(mockCarRepository.findById(1)).thenReturn(Optional.of(car))

        val serviceStoryController = ServiceStoryController(
            mockServiceReqRepo,
            mock(),
            mock(),
            mockCarRepository,
            mockCurrentUserUtil,
            mock()
        )

        assertEquals(1, serviceStoryController.create(
            CreateServiceRequest("test", "test", 1))
            .data
        )
    }
}