package fr.sncf.cpr.trecc.service;

import fr.sncf.cpr.trecc.domain.Campagne;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Campagne}.
 */
public interface CampagneService {

    /**
     * Save a campagne.
     *
     * @param campagne the entity to save.
     * @return the persisted entity.
     */
    Campagne save(Campagne campagne);

    /**
     * Get all the campagnes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Campagne> findAll(Pageable pageable);


    /**
     * Get the "id" campagne.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Campagne> findOne(Long id);

    /**
     * Delete the "id" campagne.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
