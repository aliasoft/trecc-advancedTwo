package fr.sncf.cpr.trecc.web.rest;

import fr.sncf.cpr.trecc.domain.Trace;
import fr.sncf.cpr.trecc.service.TraceService;
import fr.sncf.cpr.trecc.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.sncf.cpr.trecc.domain.Trace}.
 */
@RestController
@RequestMapping("/api")
public class TraceResource {

    private final Logger log = LoggerFactory.getLogger(TraceResource.class);

    private static final String ENTITY_NAME = "trace";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TraceService traceService;

    public TraceResource(TraceService traceService) {
        this.traceService = traceService;
    }

    /**
     * {@code POST  /traces} : Create a new trace.
     *
     * @param trace the trace to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new trace, or with status {@code 400 (Bad Request)} if the trace has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/traces")
    public ResponseEntity<Trace> createTrace(@RequestBody Trace trace) throws URISyntaxException {
        log.debug("REST request to save Trace : {}", trace);
        if (trace.getId() != null) {
            throw new BadRequestAlertException("A new trace cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Trace result = traceService.save(trace);
        return ResponseEntity.created(new URI("/api/traces/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /traces} : Updates an existing trace.
     *
     * @param trace the trace to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated trace,
     * or with status {@code 400 (Bad Request)} if the trace is not valid,
     * or with status {@code 500 (Internal Server Error)} if the trace couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/traces")
    public ResponseEntity<Trace> updateTrace(@RequestBody Trace trace) throws URISyntaxException {
        log.debug("REST request to update Trace : {}", trace);
        if (trace.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Trace result = traceService.save(trace);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, trace.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /traces} : get all the traces.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of traces in body.
     */
    @GetMapping("/traces")
    public ResponseEntity<List<Trace>> getAllTraces(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Traces");
        Page<Trace> page = traceService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /traces/:id} : get the "id" trace.
     *
     * @param id the id of the trace to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the trace, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/traces/{id}")
    public ResponseEntity<Trace> getTrace(@PathVariable Long id) {
        log.debug("REST request to get Trace : {}", id);
        Optional<Trace> trace = traceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(trace);
    }

    /**
     * {@code DELETE  /traces/:id} : delete the "id" trace.
     *
     * @param id the id of the trace to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/traces/{id}")
    public ResponseEntity<Void> deleteTrace(@PathVariable Long id) {
        log.debug("REST request to delete Trace : {}", id);
        traceService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
