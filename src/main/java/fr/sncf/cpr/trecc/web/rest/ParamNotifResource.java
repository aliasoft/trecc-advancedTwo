package fr.sncf.cpr.trecc.web.rest;

import fr.sncf.cpr.trecc.domain.ParamNotif;
import fr.sncf.cpr.trecc.repository.ParamNotifRepository;
import fr.sncf.cpr.trecc.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.sncf.cpr.trecc.domain.ParamNotif}.
 */
@RestController
@RequestMapping("/api")
public class ParamNotifResource {

    private final Logger log = LoggerFactory.getLogger(ParamNotifResource.class);

    private static final String ENTITY_NAME = "paramNotif";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ParamNotifRepository paramNotifRepository;

    public ParamNotifResource(ParamNotifRepository paramNotifRepository) {
        this.paramNotifRepository = paramNotifRepository;
    }

    /**
     * {@code POST  /param-notifs} : Create a new paramNotif.
     *
     * @param paramNotif the paramNotif to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new paramNotif, or with status {@code 400 (Bad Request)} if the paramNotif has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/param-notifs")
    public ResponseEntity<ParamNotif> createParamNotif(@RequestBody ParamNotif paramNotif) throws URISyntaxException {
        log.debug("REST request to save ParamNotif : {}", paramNotif);
        if (paramNotif.getId() != null) {
            throw new BadRequestAlertException("A new paramNotif cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ParamNotif result = paramNotifRepository.save(paramNotif);
        return ResponseEntity.created(new URI("/api/param-notifs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /param-notifs} : Updates an existing paramNotif.
     *
     * @param paramNotif the paramNotif to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated paramNotif,
     * or with status {@code 400 (Bad Request)} if the paramNotif is not valid,
     * or with status {@code 500 (Internal Server Error)} if the paramNotif couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/param-notifs")
    public ResponseEntity<ParamNotif> updateParamNotif(@RequestBody ParamNotif paramNotif) throws URISyntaxException {
        log.debug("REST request to update ParamNotif : {}", paramNotif);
        if (paramNotif.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ParamNotif result = paramNotifRepository.save(paramNotif);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, paramNotif.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /param-notifs} : get all the paramNotifs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of paramNotifs in body.
     */
    @GetMapping("/param-notifs")
    public List<ParamNotif> getAllParamNotifs() {
        log.debug("REST request to get all ParamNotifs");
        return paramNotifRepository.findAll();
    }

    /**
     * {@code GET  /param-notifs/:id} : get the "id" paramNotif.
     *
     * @param id the id of the paramNotif to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the paramNotif, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/param-notifs/{id}")
    public ResponseEntity<ParamNotif> getParamNotif(@PathVariable Long id) {
        log.debug("REST request to get ParamNotif : {}", id);
        Optional<ParamNotif> paramNotif = paramNotifRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(paramNotif);
    }

    /**
     * {@code DELETE  /param-notifs/:id} : delete the "id" paramNotif.
     *
     * @param id the id of the paramNotif to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/param-notifs/{id}")
    public ResponseEntity<Void> deleteParamNotif(@PathVariable Long id) {
        log.debug("REST request to delete ParamNotif : {}", id);
        paramNotifRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
