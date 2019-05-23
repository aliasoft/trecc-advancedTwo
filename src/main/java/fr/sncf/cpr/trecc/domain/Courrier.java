package fr.sncf.cpr.trecc.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Courrier.
 */
@Entity
@Table(name = "courrier")
public class Courrier implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_courrier")
    private Long idCourrier;

    @Column(name = "demande_envoi")
    private Instant demandeEnvoi;

    @Column(name = "date_envoi")
    private Instant dateEnvoi;

    @Column(name = "id_cpr")
    private Long idCpr;

    @Column(name = "nir")
    private String nir;

    @Column(name = "type_courrier")
    private String typeCourrier;

    @Column(name = "modele")
    private String modele;

    @Column(name = "statut_ged")
    private String statutGED;

    @Column(name = "statut_envoi_courrier")
    private String statutEnvoiCourrier;

    @ManyToOne
    @JsonIgnoreProperties("courriers")
    private Campagne fkCampagne;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdCourrier() {
        return idCourrier;
    }

    public Courrier idCourrier(Long idCourrier) {
        this.idCourrier = idCourrier;
        return this;
    }

    public void setIdCourrier(Long idCourrier) {
        this.idCourrier = idCourrier;
    }

    public Instant getDemandeEnvoi() {
        return demandeEnvoi;
    }

    public Courrier demandeEnvoi(Instant demandeEnvoi) {
        this.demandeEnvoi = demandeEnvoi;
        return this;
    }

    public void setDemandeEnvoi(Instant demandeEnvoi) {
        this.demandeEnvoi = demandeEnvoi;
    }

    public Instant getDateEnvoi() {
        return dateEnvoi;
    }

    public Courrier dateEnvoi(Instant dateEnvoi) {
        this.dateEnvoi = dateEnvoi;
        return this;
    }

    public void setDateEnvoi(Instant dateEnvoi) {
        this.dateEnvoi = dateEnvoi;
    }

    public Long getIdCpr() {
        return idCpr;
    }

    public Courrier idCpr(Long idCpr) {
        this.idCpr = idCpr;
        return this;
    }

    public void setIdCpr(Long idCpr) {
        this.idCpr = idCpr;
    }

    public String getNir() {
        return nir;
    }

    public Courrier nir(String nir) {
        this.nir = nir;
        return this;
    }

    public void setNir(String nir) {
        this.nir = nir;
    }

    public String getTypeCourrier() {
        return typeCourrier;
    }

    public Courrier typeCourrier(String typeCourrier) {
        this.typeCourrier = typeCourrier;
        return this;
    }

    public void setTypeCourrier(String typeCourrier) {
        this.typeCourrier = typeCourrier;
    }

    public String getModele() {
        return modele;
    }

    public Courrier modele(String modele) {
        this.modele = modele;
        return this;
    }

    public void setModele(String modele) {
        this.modele = modele;
    }

    public String getStatutGED() {
        return statutGED;
    }

    public Courrier statutGED(String statutGED) {
        this.statutGED = statutGED;
        return this;
    }

    public void setStatutGED(String statutGED) {
        this.statutGED = statutGED;
    }

    public String getStatutEnvoiCourrier() {
        return statutEnvoiCourrier;
    }

    public Courrier statutEnvoiCourrier(String statutEnvoiCourrier) {
        this.statutEnvoiCourrier = statutEnvoiCourrier;
        return this;
    }

    public void setStatutEnvoiCourrier(String statutEnvoiCourrier) {
        this.statutEnvoiCourrier = statutEnvoiCourrier;
    }

    public Campagne getFkCampagne() {
        return fkCampagne;
    }

    public Courrier fkCampagne(Campagne campagne) {
        this.fkCampagne = campagne;
        return this;
    }

    public void setFkCampagne(Campagne campagne) {
        this.fkCampagne = campagne;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Courrier)) {
            return false;
        }
        return id != null && id.equals(((Courrier) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Courrier{" +
            "id=" + getId() +
            ", idCourrier=" + getIdCourrier() +
            ", demandeEnvoi='" + getDemandeEnvoi() + "'" +
            ", dateEnvoi='" + getDateEnvoi() + "'" +
            ", idCpr=" + getIdCpr() +
            ", nir='" + getNir() + "'" +
            ", typeCourrier='" + getTypeCourrier() + "'" +
            ", modele='" + getModele() + "'" +
            ", statutGED='" + getStatutGED() + "'" +
            ", statutEnvoiCourrier='" + getStatutEnvoiCourrier() + "'" +
            "}";
    }
}
