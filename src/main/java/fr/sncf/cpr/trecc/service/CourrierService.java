package fr.sncf.cpr.trecc.service;

import fr.sncf.cpr.trecc.domain.Courrier;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Courrier}.
 */
public interface CourrierService {

    /**
     * Save a courrier.
     *
     * @param courrier the entity to save.
     * @return the persisted entity.
     */
    Courrier save(Courrier courrier);

    /**
     * Get all the courriers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Courrier> findAll(Pageable pageable);


    /**
     * Get the "id" courrier.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Courrier> findOne(Long id);

    /**
     * Delete the "id" courrier.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
