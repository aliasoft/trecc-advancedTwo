package fr.sncf.cpr.trecc.web.rest;

import fr.sncf.cpr.trecc.TreccApp;
import fr.sncf.cpr.trecc.domain.Trace;
import fr.sncf.cpr.trecc.repository.TraceRepository;
import fr.sncf.cpr.trecc.service.TraceService;
import fr.sncf.cpr.trecc.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static fr.sncf.cpr.trecc.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link TraceResource} REST controller.
 */
@SpringBootTest(classes = TreccApp.class)
public class TraceResourceIT {

    private static final Long DEFAULT_ID_TRACE = 1L;
    private static final Long UPDATED_ID_TRACE = 2L;

    private static final String DEFAULT_TYPE_COURRIER = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_COURRIER = "BBBBBBBBBB";

    private static final Instant DEFAULT_TIMESTAMP_PROCESS = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIMESTAMP_PROCESS = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_ID_CPR = 1L;
    private static final Long UPDATED_ID_CPR = 2L;

    private static final String DEFAULT_NIR = "AAAAAAAAAA";
    private static final String UPDATED_NIR = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESSE_ENTRANTE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE_ENTRANTE = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESSE_ENRICHIE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE_ENRICHIE = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_ERREUR = "AAAAAAAAAA";
    private static final String UPDATED_ERREUR = "BBBBBBBBBB";

    @Autowired
    private TraceRepository traceRepository;

    @Autowired
    private TraceService traceService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTraceMockMvc;

    private Trace trace;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TraceResource traceResource = new TraceResource(traceService);
        this.restTraceMockMvc = MockMvcBuilders.standaloneSetup(traceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Trace createEntity(EntityManager em) {
        Trace trace = new Trace()
            .idTrace(DEFAULT_ID_TRACE)
            .typeCourrier(DEFAULT_TYPE_COURRIER)
            .timestampProcess(DEFAULT_TIMESTAMP_PROCESS)
            .idCpr(DEFAULT_ID_CPR)
            .nir(DEFAULT_NIR)
            .adresseEntrante(DEFAULT_ADRESSE_ENTRANTE)
            .adresseEnrichie(DEFAULT_ADRESSE_ENRICHIE)
            .email(DEFAULT_EMAIL)
            .erreur(DEFAULT_ERREUR);
        return trace;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Trace createUpdatedEntity(EntityManager em) {
        Trace trace = new Trace()
            .idTrace(UPDATED_ID_TRACE)
            .typeCourrier(UPDATED_TYPE_COURRIER)
            .timestampProcess(UPDATED_TIMESTAMP_PROCESS)
            .idCpr(UPDATED_ID_CPR)
            .nir(UPDATED_NIR)
            .adresseEntrante(UPDATED_ADRESSE_ENTRANTE)
            .adresseEnrichie(UPDATED_ADRESSE_ENRICHIE)
            .email(UPDATED_EMAIL)
            .erreur(UPDATED_ERREUR);
        return trace;
    }

    @BeforeEach
    public void initTest() {
        trace = createEntity(em);
    }

    @Test
    @Transactional
    public void createTrace() throws Exception {
        int databaseSizeBeforeCreate = traceRepository.findAll().size();

        // Create the Trace
        restTraceMockMvc.perform(post("/api/traces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trace)))
            .andExpect(status().isCreated());

        // Validate the Trace in the database
        List<Trace> traceList = traceRepository.findAll();
        assertThat(traceList).hasSize(databaseSizeBeforeCreate + 1);
        Trace testTrace = traceList.get(traceList.size() - 1);
        assertThat(testTrace.getIdTrace()).isEqualTo(DEFAULT_ID_TRACE);
        assertThat(testTrace.getTypeCourrier()).isEqualTo(DEFAULT_TYPE_COURRIER);
        assertThat(testTrace.getTimestampProcess()).isEqualTo(DEFAULT_TIMESTAMP_PROCESS);
        assertThat(testTrace.getIdCpr()).isEqualTo(DEFAULT_ID_CPR);
        assertThat(testTrace.getNir()).isEqualTo(DEFAULT_NIR);
        assertThat(testTrace.getAdresseEntrante()).isEqualTo(DEFAULT_ADRESSE_ENTRANTE);
        assertThat(testTrace.getAdresseEnrichie()).isEqualTo(DEFAULT_ADRESSE_ENRICHIE);
        assertThat(testTrace.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testTrace.getErreur()).isEqualTo(DEFAULT_ERREUR);
    }

    @Test
    @Transactional
    public void createTraceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = traceRepository.findAll().size();

        // Create the Trace with an existing ID
        trace.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTraceMockMvc.perform(post("/api/traces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trace)))
            .andExpect(status().isBadRequest());

        // Validate the Trace in the database
        List<Trace> traceList = traceRepository.findAll();
        assertThat(traceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTraces() throws Exception {
        // Initialize the database
        traceRepository.saveAndFlush(trace);

        // Get all the traceList
        restTraceMockMvc.perform(get("/api/traces?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(trace.getId().intValue())))
            .andExpect(jsonPath("$.[*].idTrace").value(hasItem(DEFAULT_ID_TRACE.intValue())))
            .andExpect(jsonPath("$.[*].typeCourrier").value(hasItem(DEFAULT_TYPE_COURRIER.toString())))
            .andExpect(jsonPath("$.[*].timestampProcess").value(hasItem(DEFAULT_TIMESTAMP_PROCESS.toString())))
            .andExpect(jsonPath("$.[*].idCpr").value(hasItem(DEFAULT_ID_CPR.intValue())))
            .andExpect(jsonPath("$.[*].nir").value(hasItem(DEFAULT_NIR.toString())))
            .andExpect(jsonPath("$.[*].adresseEntrante").value(hasItem(DEFAULT_ADRESSE_ENTRANTE.toString())))
            .andExpect(jsonPath("$.[*].adresseEnrichie").value(hasItem(DEFAULT_ADRESSE_ENRICHIE.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].erreur").value(hasItem(DEFAULT_ERREUR.toString())));
    }
    
    @Test
    @Transactional
    public void getTrace() throws Exception {
        // Initialize the database
        traceRepository.saveAndFlush(trace);

        // Get the trace
        restTraceMockMvc.perform(get("/api/traces/{id}", trace.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(trace.getId().intValue()))
            .andExpect(jsonPath("$.idTrace").value(DEFAULT_ID_TRACE.intValue()))
            .andExpect(jsonPath("$.typeCourrier").value(DEFAULT_TYPE_COURRIER.toString()))
            .andExpect(jsonPath("$.timestampProcess").value(DEFAULT_TIMESTAMP_PROCESS.toString()))
            .andExpect(jsonPath("$.idCpr").value(DEFAULT_ID_CPR.intValue()))
            .andExpect(jsonPath("$.nir").value(DEFAULT_NIR.toString()))
            .andExpect(jsonPath("$.adresseEntrante").value(DEFAULT_ADRESSE_ENTRANTE.toString()))
            .andExpect(jsonPath("$.adresseEnrichie").value(DEFAULT_ADRESSE_ENRICHIE.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.erreur").value(DEFAULT_ERREUR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTrace() throws Exception {
        // Get the trace
        restTraceMockMvc.perform(get("/api/traces/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTrace() throws Exception {
        // Initialize the database
        traceService.save(trace);

        int databaseSizeBeforeUpdate = traceRepository.findAll().size();

        // Update the trace
        Trace updatedTrace = traceRepository.findById(trace.getId()).get();
        // Disconnect from session so that the updates on updatedTrace are not directly saved in db
        em.detach(updatedTrace);
        updatedTrace
            .idTrace(UPDATED_ID_TRACE)
            .typeCourrier(UPDATED_TYPE_COURRIER)
            .timestampProcess(UPDATED_TIMESTAMP_PROCESS)
            .idCpr(UPDATED_ID_CPR)
            .nir(UPDATED_NIR)
            .adresseEntrante(UPDATED_ADRESSE_ENTRANTE)
            .adresseEnrichie(UPDATED_ADRESSE_ENRICHIE)
            .email(UPDATED_EMAIL)
            .erreur(UPDATED_ERREUR);

        restTraceMockMvc.perform(put("/api/traces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTrace)))
            .andExpect(status().isOk());

        // Validate the Trace in the database
        List<Trace> traceList = traceRepository.findAll();
        assertThat(traceList).hasSize(databaseSizeBeforeUpdate);
        Trace testTrace = traceList.get(traceList.size() - 1);
        assertThat(testTrace.getIdTrace()).isEqualTo(UPDATED_ID_TRACE);
        assertThat(testTrace.getTypeCourrier()).isEqualTo(UPDATED_TYPE_COURRIER);
        assertThat(testTrace.getTimestampProcess()).isEqualTo(UPDATED_TIMESTAMP_PROCESS);
        assertThat(testTrace.getIdCpr()).isEqualTo(UPDATED_ID_CPR);
        assertThat(testTrace.getNir()).isEqualTo(UPDATED_NIR);
        assertThat(testTrace.getAdresseEntrante()).isEqualTo(UPDATED_ADRESSE_ENTRANTE);
        assertThat(testTrace.getAdresseEnrichie()).isEqualTo(UPDATED_ADRESSE_ENRICHIE);
        assertThat(testTrace.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testTrace.getErreur()).isEqualTo(UPDATED_ERREUR);
    }

    @Test
    @Transactional
    public void updateNonExistingTrace() throws Exception {
        int databaseSizeBeforeUpdate = traceRepository.findAll().size();

        // Create the Trace

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTraceMockMvc.perform(put("/api/traces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trace)))
            .andExpect(status().isBadRequest());

        // Validate the Trace in the database
        List<Trace> traceList = traceRepository.findAll();
        assertThat(traceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTrace() throws Exception {
        // Initialize the database
        traceService.save(trace);

        int databaseSizeBeforeDelete = traceRepository.findAll().size();

        // Delete the trace
        restTraceMockMvc.perform(delete("/api/traces/{id}", trace.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Trace> traceList = traceRepository.findAll();
        assertThat(traceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Trace.class);
        Trace trace1 = new Trace();
        trace1.setId(1L);
        Trace trace2 = new Trace();
        trace2.setId(trace1.getId());
        assertThat(trace1).isEqualTo(trace2);
        trace2.setId(2L);
        assertThat(trace1).isNotEqualTo(trace2);
        trace1.setId(null);
        assertThat(trace1).isNotEqualTo(trace2);
    }
}
