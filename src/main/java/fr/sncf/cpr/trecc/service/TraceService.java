package fr.sncf.cpr.trecc.service;

import fr.sncf.cpr.trecc.domain.Trace;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Trace}.
 */
public interface TraceService {

    /**
     * Save a trace.
     *
     * @param trace the entity to save.
     * @return the persisted entity.
     */
    Trace save(Trace trace);

    /**
     * Get all the traces.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Trace> findAll(Pageable pageable);


    /**
     * Get the "id" trace.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Trace> findOne(Long id);

    /**
     * Delete the "id" trace.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
