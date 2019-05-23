package fr.sncf.cpr.trecc.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Notification.
 */
@Entity
@Table(name = "notification")
public class Notification implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_trace")
    private Long idTrace;

    @Column(name = "type_courrier")
    private String typeCourrier;

    @Column(name = "timestamp_process")
    private Instant timestampProcess;

    @Column(name = "id_cpr")
    private Long idCpr;

    @Column(name = "nir")
    private String nir;

    @Column(name = "adresse_entrante")
    private String adresseEntrante;

    @Column(name = "adresse_enrichie")
    private String adresseEnrichie;

    @Column(name = "email")
    private String email;

    @Column(name = "erreur")
    private String erreur;

    @ManyToOne
    @JsonIgnoreProperties("notifications")
    private Courrier fkCourrier;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdTrace() {
        return idTrace;
    }

    public Notification idTrace(Long idTrace) {
        this.idTrace = idTrace;
        return this;
    }

    public void setIdTrace(Long idTrace) {
        this.idTrace = idTrace;
    }

    public String getTypeCourrier() {
        return typeCourrier;
    }

    public Notification typeCourrier(String typeCourrier) {
        this.typeCourrier = typeCourrier;
        return this;
    }

    public void setTypeCourrier(String typeCourrier) {
        this.typeCourrier = typeCourrier;
    }

    public Instant getTimestampProcess() {
        return timestampProcess;
    }

    public Notification timestampProcess(Instant timestampProcess) {
        this.timestampProcess = timestampProcess;
        return this;
    }

    public void setTimestampProcess(Instant timestampProcess) {
        this.timestampProcess = timestampProcess;
    }

    public Long getIdCpr() {
        return idCpr;
    }

    public Notification idCpr(Long idCpr) {
        this.idCpr = idCpr;
        return this;
    }

    public void setIdCpr(Long idCpr) {
        this.idCpr = idCpr;
    }

    public String getNir() {
        return nir;
    }

    public Notification nir(String nir) {
        this.nir = nir;
        return this;
    }

    public void setNir(String nir) {
        this.nir = nir;
    }

    public String getAdresseEntrante() {
        return adresseEntrante;
    }

    public Notification adresseEntrante(String adresseEntrante) {
        this.adresseEntrante = adresseEntrante;
        return this;
    }

    public void setAdresseEntrante(String adresseEntrante) {
        this.adresseEntrante = adresseEntrante;
    }

    public String getAdresseEnrichie() {
        return adresseEnrichie;
    }

    public Notification adresseEnrichie(String adresseEnrichie) {
        this.adresseEnrichie = adresseEnrichie;
        return this;
    }

    public void setAdresseEnrichie(String adresseEnrichie) {
        this.adresseEnrichie = adresseEnrichie;
    }

    public String getEmail() {
        return email;
    }

    public Notification email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getErreur() {
        return erreur;
    }

    public Notification erreur(String erreur) {
        this.erreur = erreur;
        return this;
    }

    public void setErreur(String erreur) {
        this.erreur = erreur;
    }

    public Courrier getFkCourrier() {
        return fkCourrier;
    }

    public Notification fkCourrier(Courrier courrier) {
        this.fkCourrier = courrier;
        return this;
    }

    public void setFkCourrier(Courrier courrier) {
        this.fkCourrier = courrier;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Notification)) {
            return false;
        }
        return id != null && id.equals(((Notification) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Notification{" +
            "id=" + getId() +
            ", idTrace=" + getIdTrace() +
            ", typeCourrier='" + getTypeCourrier() + "'" +
            ", timestampProcess='" + getTimestampProcess() + "'" +
            ", idCpr=" + getIdCpr() +
            ", nir='" + getNir() + "'" +
            ", adresseEntrante='" + getAdresseEntrante() + "'" +
            ", adresseEnrichie='" + getAdresseEnrichie() + "'" +
            ", email='" + getEmail() + "'" +
            ", erreur='" + getErreur() + "'" +
            "}";
    }
}
