package fr.sncf.cpr.trecc.service.impl;

import fr.sncf.cpr.trecc.service.CampagneService;
import fr.sncf.cpr.trecc.domain.Campagne;
import fr.sncf.cpr.trecc.repository.CampagneRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Campagne}.
 */
@Service
@Transactional
public class CampagneServiceImpl implements CampagneService {

    private final Logger log = LoggerFactory.getLogger(CampagneServiceImpl.class);

    private final CampagneRepository campagneRepository;

    public CampagneServiceImpl(CampagneRepository campagneRepository) {
        this.campagneRepository = campagneRepository;
    }

    /**
     * Save a campagne.
     *
     * @param campagne the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Campagne save(Campagne campagne) {
        log.debug("Request to save Campagne : {}", campagne);
        return campagneRepository.save(campagne);
    }

    /**
     * Get all the campagnes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Campagne> findAll(Pageable pageable) {
        log.debug("Request to get all Campagnes");
        return campagneRepository.findAll(pageable);
    }


    /**
     * Get one campagne by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Campagne> findOne(Long id) {
        log.debug("Request to get Campagne : {}", id);
        return campagneRepository.findById(id);
    }

    /**
     * Delete the campagne by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Campagne : {}", id);
        campagneRepository.deleteById(id);
    }
}
