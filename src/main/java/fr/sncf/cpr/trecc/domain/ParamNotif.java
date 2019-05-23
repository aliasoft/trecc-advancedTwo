package fr.sncf.cpr.trecc.domain;


import io.swagger.annotations.ApiModel;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * not an ignored comment
 */
@ApiModel(description = "not an ignored comment")
@Entity
@Table(name = "param_notif")
public class ParamNotif implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "max_envoi")
    private Long maxEnvoi;

    @Column(name = "envoi_en_cours")
    private Long envoiEnCours;

    @Column(name = "debut_horaire")
    private Instant debutHoraire;

    @Column(name = "fin_horaire")
    private Instant finHoraire;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMaxEnvoi() {
        return maxEnvoi;
    }

    public ParamNotif maxEnvoi(Long maxEnvoi) {
        this.maxEnvoi = maxEnvoi;
        return this;
    }

    public void setMaxEnvoi(Long maxEnvoi) {
        this.maxEnvoi = maxEnvoi;
    }

    public Long getEnvoiEnCours() {
        return envoiEnCours;
    }

    public ParamNotif envoiEnCours(Long envoiEnCours) {
        this.envoiEnCours = envoiEnCours;
        return this;
    }

    public void setEnvoiEnCours(Long envoiEnCours) {
        this.envoiEnCours = envoiEnCours;
    }

    public Instant getDebutHoraire() {
        return debutHoraire;
    }

    public ParamNotif debutHoraire(Instant debutHoraire) {
        this.debutHoraire = debutHoraire;
        return this;
    }

    public void setDebutHoraire(Instant debutHoraire) {
        this.debutHoraire = debutHoraire;
    }

    public Instant getFinHoraire() {
        return finHoraire;
    }

    public ParamNotif finHoraire(Instant finHoraire) {
        this.finHoraire = finHoraire;
        return this;
    }

    public void setFinHoraire(Instant finHoraire) {
        this.finHoraire = finHoraire;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ParamNotif)) {
            return false;
        }
        return id != null && id.equals(((ParamNotif) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ParamNotif{" +
            "id=" + getId() +
            ", maxEnvoi=" + getMaxEnvoi() +
            ", envoiEnCours=" + getEnvoiEnCours() +
            ", debutHoraire='" + getDebutHoraire() + "'" +
            ", finHoraire='" + getFinHoraire() + "'" +
            "}";
    }
}
