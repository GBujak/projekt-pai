package warsztat.warsztatserver.models.util

class RestMessage<T>(
    val msg: String,
    val data: T? = null,
)
