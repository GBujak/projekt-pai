package warsztat.warsztatserver.controllers

import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.GetMapping
import warsztat.warsztatserver.repositories.CarMakeRepository

@RestController
class IndexController(
    val carMakeRepository: CarMakeRepository
) {
    @GetMapping("/api/index")
    fun getIndex(): String = "Hello world"
    @GetMapping("/api/index/car-makes")
    fun getCarMakes() = carMakeRepository.findAll()
}