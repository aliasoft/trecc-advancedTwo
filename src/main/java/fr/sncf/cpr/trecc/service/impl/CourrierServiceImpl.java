package fr.sncf.cpr.trecc.service.impl;

import fr.sncf.cpr.trecc.service.CourrierService;
import fr.sncf.cpr.trecc.domain.Courrier;
import fr.sncf.cpr.trecc.repository.CourrierRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Courrier}.
 */
@Service
@Transactional
public class CourrierServiceImpl implements CourrierService {

    private final Logger log = LoggerFactory.getLogger(CourrierServiceImpl.class);

    private final CourrierRepository courrierRepository;

    public CourrierServiceImpl(CourrierRepository courrierRepository) {
        this.courrierRepository = courrierRepository;
    }

    /**
     * Save a courrier.
     *
     * @param courrier the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Courrier save(Courrier courrier) {
        log.debug("Request to save Courrier : {}", courrier);
        return courrierRepository.save(courrier);
    }

    /**
     * Get all the courriers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Courrier> findAll(Pageable pageable) {
        log.debug("Request to get all Courriers");
        return courrierRepository.findAll(pageable);
    }


    /**
     * Get one courrier by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Courrier> findOne(Long id) {
        log.debug("Request to get Courrier : {}", id);
        return courrierRepository.findById(id);
    }

    /**
     * Delete the courrier by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Courrier : {}", id);
        courrierRepository.deleteById(id);
    }
}
