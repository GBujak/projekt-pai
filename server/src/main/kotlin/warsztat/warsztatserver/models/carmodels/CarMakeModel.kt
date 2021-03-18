package warsztat.warsztatserver.models.carmodels

import javax.persistence.*

@Entity
class CarMake (
        val makeName: String,

        @OneToMany(
                fetch = FetchType.LAZY,
                mappedBy = "carMake",
                cascade = arrayOf(CascadeType.ALL),
                orphanRemoval = true,
        )
        val carModels: Set<CarModel>,

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
)

@Entity
class CarModel (
        val modelName: String,
        val modelVariant: String,

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "fk_carmake")
        val carMake: CarMake,

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0
)