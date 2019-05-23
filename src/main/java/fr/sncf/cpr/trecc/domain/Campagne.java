package fr.sncf.cpr.trecc.domain;



import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Campagne.
 */
@Entity
@Table(name = "campagne")
public class Campagne implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_campagne")
    private Long idCampagne;

    @Column(name = "statut")
    private String statut;

    @Column(name = "fichier")
    private String fichier;

    @Column(name = "date_debut")
    private Instant dateDebut;

    @Column(name = "date_fin")
    private Instant dateFin;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdCampagne() {
        return idCampagne;
    }

    public Campagne idCampagne(Long idCampagne) {
        this.idCampagne = idCampagne;
        return this;
    }

    public void setIdCampagne(Long idCampagne) {
        this.idCampagne = idCampagne;
    }

    public String getStatut() {
        return statut;
    }

    public Campagne statut(String statut) {
        this.statut = statut;
        return this;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public String getFichier() {
        return fichier;
    }

    public Campagne fichier(String fichier) {
        this.fichier = fichier;
        return this;
    }

    public void setFichier(String fichier) {
        this.fichier = fichier;
    }

    public Instant getDateDebut() {
        return dateDebut;
    }

    public Campagne dateDebut(Instant dateDebut) {
        this.dateDebut = dateDebut;
        return this;
    }

    public void setDateDebut(Instant dateDebut) {
        this.dateDebut = dateDebut;
    }

    public Instant getDateFin() {
        return dateFin;
    }

    public Campagne dateFin(Instant dateFin) {
        this.dateFin = dateFin;
        return this;
    }

    public void setDateFin(Instant dateFin) {
        this.dateFin = dateFin;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Campagne)) {
            return false;
        }
        return id != null && id.equals(((Campagne) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Campagne{" +
            "id=" + getId() +
            ", idCampagne=" + getIdCampagne() +
            ", statut='" + getStatut() + "'" +
            ", fichier='" + getFichier() + "'" +
            ", dateDebut='" + getDateDebut() + "'" +
            ", dateFin='" + getDateFin() + "'" +
            "}";
    }
}
