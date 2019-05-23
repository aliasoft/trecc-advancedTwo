package fr.sncf.cpr.trecc.domain;


import io.swagger.annotations.ApiModel;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * Task entity.
 * @author The JHipster team.
 */
@ApiModel(description = "Task entity. @author The JHipster team.")
@Entity
@Table(name = "type_doc")
public class TypeDoc implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "type_doc")
    private Long typeDoc;

    @Column(name = "nom_courrier")
    private String nomCourrier;

    @Column(name = "nom_email")
    private String nomEmail;

    @Column(name = "nom_ep")
    private String nomEp;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTypeDoc() {
        return typeDoc;
    }

    public TypeDoc typeDoc(Long typeDoc) {
        this.typeDoc = typeDoc;
        return this;
    }

    public void setTypeDoc(Long typeDoc) {
        this.typeDoc = typeDoc;
    }

    public String getNomCourrier() {
        return nomCourrier;
    }

    public TypeDoc nomCourrier(String nomCourrier) {
        this.nomCourrier = nomCourrier;
        return this;
    }

    public void setNomCourrier(String nomCourrier) {
        this.nomCourrier = nomCourrier;
    }

    public String getNomEmail() {
        return nomEmail;
    }

    public TypeDoc nomEmail(String nomEmail) {
        this.nomEmail = nomEmail;
        return this;
    }

    public void setNomEmail(String nomEmail) {
        this.nomEmail = nomEmail;
    }

    public String getNomEp() {
        return nomEp;
    }

    public TypeDoc nomEp(String nomEp) {
        this.nomEp = nomEp;
        return this;
    }

    public void setNomEp(String nomEp) {
        this.nomEp = nomEp;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TypeDoc)) {
            return false;
        }
        return id != null && id.equals(((TypeDoc) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TypeDoc{" +
            "id=" + getId() +
            ", typeDoc=" + getTypeDoc() +
            ", nomCourrier='" + getNomCourrier() + "'" +
            ", nomEmail='" + getNomEmail() + "'" +
            ", nomEp='" + getNomEp() + "'" +
            "}";
    }
}
