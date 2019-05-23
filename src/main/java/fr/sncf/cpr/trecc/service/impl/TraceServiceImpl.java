package fr.sncf.cpr.trecc.service.impl;

import fr.sncf.cpr.trecc.service.TraceService;
import fr.sncf.cpr.trecc.domain.Trace;
import fr.sncf.cpr.trecc.repository.TraceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Trace}.
 */
@Service
@Transactional
public class TraceServiceImpl implements TraceService {

    private final Logger log = LoggerFactory.getLogger(TraceServiceImpl.class);

    private final TraceRepository traceRepository;

    public TraceServiceImpl(TraceRepository traceRepository) {
        this.traceRepository = traceRepository;
    }

    /**
     * Save a trace.
     *
     * @param trace the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Trace save(Trace trace) {
        log.debug("Request to save Trace : {}", trace);
        return traceRepository.save(trace);
    }

    /**
     * Get all the traces.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Trace> findAll(Pageable pageable) {
        log.debug("Request to get all Traces");
        return traceRepository.findAll(pageable);
    }


    /**
     * Get one trace by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Trace> findOne(Long id) {
        log.debug("Request to get Trace : {}", id);
        return traceRepository.findById(id);
    }

    /**
     * Delete the trace by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Trace : {}", id);
        traceRepository.deleteById(id);
    }
}
