package warsztat.warsztatserver.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/manager")
class ManagerController {
    @GetMapping("/")
    fun test() = "Hello world"
}