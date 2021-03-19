# Modele związane z historią usługi

```kotlin
@Entity
data class ServiceRequest (
    @Temporal(TemporalType.TIMESTAMP) // przechowuj w bazie danych jako pole TIMESTAMP (data i czas)
    val submittedOn: Date,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_submitter")
    val submitter: ApplicationUser,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_assignedworker", nullable = true)
    val assignedWorker: ApplicationUser? = null,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
)
```

```kotlin
@Entity
class ServiceComment (
    var title: String,
    var bodyText: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_servicerequest")
    val serviceRequest: ServiceRequest,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_submitter")
    val submitter: ApplicationUser,

    @OneToMany(
        fetch = FetchType.LAZY,
        mappedBy = "serviceComment",
        cascade = arrayOf(CascadeType.ALL),
        orphanRemoval = true,
    )
    @JsonManagedReference
    var workDescriptions: Set<WorkDescription> = setOf(),

    @Temporal(TemporalType.TIMESTAMP)
    val submittedOn: Date = Date(),

    @Column(nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    var editedOn: Date? = null,

    val submitterRole: ApplicationUserType = submitter.userType,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
)
```

```kotlin
@Entity
class WorkDescription (
    val workName: String,
    val workHours: Int,

    @ManyToMany
    var usedParts: Set<CarPart>,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_servicecomment")
    @JsonBackReference
    val serviceComment: ServiceComment,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
) {
    init {
        assert(serviceComment.submitterRole != ApplicationUserType.CUSTOMER)
    }
}
```
