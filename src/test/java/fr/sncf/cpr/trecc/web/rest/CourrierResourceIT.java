package fr.sncf.cpr.trecc.web.rest;

import fr.sncf.cpr.trecc.TreccApp;
import fr.sncf.cpr.trecc.domain.Courrier;
import fr.sncf.cpr.trecc.repository.CourrierRepository;
import fr.sncf.cpr.trecc.service.CourrierService;
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
 * Integration tests for the {@Link CourrierResource} REST controller.
 */
@SpringBootTest(classes = TreccApp.class)
public class CourrierResourceIT {

    private static final Long DEFAULT_ID_COURRIER = 1L;
    private static final Long UPDATED_ID_COURRIER = 2L;

    private static final Instant DEFAULT_DEMANDE_ENVOI = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DEMANDE_ENVOI = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATE_ENVOI = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_ENVOI = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_ID_CPR = 1L;
    private static final Long UPDATED_ID_CPR = 2L;

    private static final String DEFAULT_NIR = "AAAAAAAAAA";
    private static final String UPDATED_NIR = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE_COURRIER = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_COURRIER = "BBBBBBBBBB";

    private static final String DEFAULT_MODELE = "AAAAAAAAAA";
    private static final String UPDATED_MODELE = "BBBBBBBBBB";

    private static final String DEFAULT_STATUT_GED = "AAAAAAAAAA";
    private static final String UPDATED_STATUT_GED = "BBBBBBBBBB";

    private static final String DEFAULT_STATUT_ENVOI_COURRIER = "AAAAAAAAAA";
    private static final String UPDATED_STATUT_ENVOI_COURRIER = "BBBBBBBBBB";

    @Autowired
    private CourrierRepository courrierRepository;

    @Autowired
    private CourrierService courrierService;

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

    private MockMvc restCourrierMockMvc;

    private Courrier courrier;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CourrierResource courrierResource = new CourrierResource(courrierService);
        this.restCourrierMockMvc = MockMvcBuilders.standaloneSetup(courrierResource)
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
    public static Courrier createEntity(EntityManager em) {
        Courrier courrier = new Courrier()
            .idCourrier(DEFAULT_ID_COURRIER)
            .demandeEnvoi(DEFAULT_DEMANDE_ENVOI)
            .dateEnvoi(DEFAULT_DATE_ENVOI)
            .idCpr(DEFAULT_ID_CPR)
            .nir(DEFAULT_NIR)
            .typeCourrier(DEFAULT_TYPE_COURRIER)
            .modele(DEFAULT_MODELE)
            .statutGED(DEFAULT_STATUT_GED)
            .statutEnvoiCourrier(DEFAULT_STATUT_ENVOI_COURRIER);
        return courrier;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Courrier createUpdatedEntity(EntityManager em) {
        Courrier courrier = new Courrier()
            .idCourrier(UPDATED_ID_COURRIER)
            .demandeEnvoi(UPDATED_DEMANDE_ENVOI)
            .dateEnvoi(UPDATED_DATE_ENVOI)
            .idCpr(UPDATED_ID_CPR)
            .nir(UPDATED_NIR)
            .typeCourrier(UPDATED_TYPE_COURRIER)
            .modele(UPDATED_MODELE)
            .statutGED(UPDATED_STATUT_GED)
            .statutEnvoiCourrier(UPDATED_STATUT_ENVOI_COURRIER);
        return courrier;
    }

    @BeforeEach
    public void initTest() {
        courrier = createEntity(em);
    }

    @Test
    @Transactional
    public void createCourrier() throws Exception {
        int databaseSizeBeforeCreate = courrierRepository.findAll().size();

        // Create the Courrier
        restCourrierMockMvc.perform(post("/api/courriers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courrier)))
            .andExpect(status().isCreated());

        // Validate the Courrier in the database
        List<Courrier> courrierList = courrierRepository.findAll();
        assertThat(courrierList).hasSize(databaseSizeBeforeCreate + 1);
        Courrier testCourrier = courrierList.get(courrierList.size() - 1);
        assertThat(testCourrier.getIdCourrier()).isEqualTo(DEFAULT_ID_COURRIER);
        assertThat(testCourrier.getDemandeEnvoi()).isEqualTo(DEFAULT_DEMANDE_ENVOI);
        assertThat(testCourrier.getDateEnvoi()).isEqualTo(DEFAULT_DATE_ENVOI);
        assertThat(testCourrier.getIdCpr()).isEqualTo(DEFAULT_ID_CPR);
        assertThat(testCourrier.getNir()).isEqualTo(DEFAULT_NIR);
        assertThat(testCourrier.getTypeCourrier()).isEqualTo(DEFAULT_TYPE_COURRIER);
        assertThat(testCourrier.getModele()).isEqualTo(DEFAULT_MODELE);
        assertThat(testCourrier.getStatutGED()).isEqualTo(DEFAULT_STATUT_GED);
        assertThat(testCourrier.getStatutEnvoiCourrier()).isEqualTo(DEFAULT_STATUT_ENVOI_COURRIER);
    }

    @Test
    @Transactional
    public void createCourrierWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = courrierRepository.findAll().size();

        // Create the Courrier with an existing ID
        courrier.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCourrierMockMvc.perform(post("/api/courriers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courrier)))
            .andExpect(status().isBadRequest());

        // Validate the Courrier in the database
        List<Courrier> courrierList = courrierRepository.findAll();
        assertThat(courrierList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCourriers() throws Exception {
        // Initialize the database
        courrierRepository.saveAndFlush(courrier);

        // Get all the courrierList
        restCourrierMockMvc.perform(get("/api/courriers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(courrier.getId().intValue())))
            .andExpect(jsonPath("$.[*].idCourrier").value(hasItem(DEFAULT_ID_COURRIER.intValue())))
            .andExpect(jsonPath("$.[*].demandeEnvoi").value(hasItem(DEFAULT_DEMANDE_ENVOI.toString())))
            .andExpect(jsonPath("$.[*].dateEnvoi").value(hasItem(DEFAULT_DATE_ENVOI.toString())))
            .andExpect(jsonPath("$.[*].idCpr").value(hasItem(DEFAULT_ID_CPR.intValue())))
            .andExpect(jsonPath("$.[*].nir").value(hasItem(DEFAULT_NIR.toString())))
            .andExpect(jsonPath("$.[*].typeCourrier").value(hasItem(DEFAULT_TYPE_COURRIER.toString())))
            .andExpect(jsonPath("$.[*].modele").value(hasItem(DEFAULT_MODELE.toString())))
            .andExpect(jsonPath("$.[*].statutGED").value(hasItem(DEFAULT_STATUT_GED.toString())))
            .andExpect(jsonPath("$.[*].statutEnvoiCourrier").value(hasItem(DEFAULT_STATUT_ENVOI_COURRIER.toString())));
    }
    
    @Test
    @Transactional
    public void getCourrier() throws Exception {
        // Initialize the database
        courrierRepository.saveAndFlush(courrier);

        // Get the courrier
        restCourrierMockMvc.perform(get("/api/courriers/{id}", courrier.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(courrier.getId().intValue()))
            .andExpect(jsonPath("$.idCourrier").value(DEFAULT_ID_COURRIER.intValue()))
            .andExpect(jsonPath("$.demandeEnvoi").value(DEFAULT_DEMANDE_ENVOI.toString()))
            .andExpect(jsonPath("$.dateEnvoi").value(DEFAULT_DATE_ENVOI.toString()))
            .andExpect(jsonPath("$.idCpr").value(DEFAULT_ID_CPR.intValue()))
            .andExpect(jsonPath("$.nir").value(DEFAULT_NIR.toString()))
            .andExpect(jsonPath("$.typeCourrier").value(DEFAULT_TYPE_COURRIER.toString()))
            .andExpect(jsonPath("$.modele").value(DEFAULT_MODELE.toString()))
            .andExpect(jsonPath("$.statutGED").value(DEFAULT_STATUT_GED.toString()))
            .andExpect(jsonPath("$.statutEnvoiCourrier").value(DEFAULT_STATUT_ENVOI_COURRIER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCourrier() throws Exception {
        // Get the courrier
        restCourrierMockMvc.perform(get("/api/courriers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCourrier() throws Exception {
        // Initialize the database
        courrierService.save(courrier);

        int databaseSizeBeforeUpdate = courrierRepository.findAll().size();

        // Update the courrier
        Courrier updatedCourrier = courrierRepository.findById(courrier.getId()).get();
        // Disconnect from session so that the updates on updatedCourrier are not directly saved in db
        em.detach(updatedCourrier);
        updatedCourrier
            .idCourrier(UPDATED_ID_COURRIER)
            .demandeEnvoi(UPDATED_DEMANDE_ENVOI)
            .dateEnvoi(UPDATED_DATE_ENVOI)
            .idCpr(UPDATED_ID_CPR)
            .nir(UPDATED_NIR)
            .typeCourrier(UPDATED_TYPE_COURRIER)
            .modele(UPDATED_MODELE)
            .statutGED(UPDATED_STATUT_GED)
            .statutEnvoiCourrier(UPDATED_STATUT_ENVOI_COURRIER);

        restCourrierMockMvc.perform(put("/api/courriers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCourrier)))
            .andExpect(status().isOk());

        // Validate the Courrier in the database
        List<Courrier> courrierList = courrierRepository.findAll();
        assertThat(courrierList).hasSize(databaseSizeBeforeUpdate);
        Courrier testCourrier = courrierList.get(courrierList.size() - 1);
        assertThat(testCourrier.getIdCourrier()).isEqualTo(UPDATED_ID_COURRIER);
        assertThat(testCourrier.getDemandeEnvoi()).isEqualTo(UPDATED_DEMANDE_ENVOI);
        assertThat(testCourrier.getDateEnvoi()).isEqualTo(UPDATED_DATE_ENVOI);
        assertThat(testCourrier.getIdCpr()).isEqualTo(UPDATED_ID_CPR);
        assertThat(testCourrier.getNir()).isEqualTo(UPDATED_NIR);
        assertThat(testCourrier.getTypeCourrier()).isEqualTo(UPDATED_TYPE_COURRIER);
        assertThat(testCourrier.getModele()).isEqualTo(UPDATED_MODELE);
        assertThat(testCourrier.getStatutGED()).isEqualTo(UPDATED_STATUT_GED);
        assertThat(testCourrier.getStatutEnvoiCourrier()).isEqualTo(UPDATED_STATUT_ENVOI_COURRIER);
    }

    @Test
    @Transactional
    public void updateNonExistingCourrier() throws Exception {
        int databaseSizeBeforeUpdate = courrierRepository.findAll().size();

        // Create the Courrier

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCourrierMockMvc.perform(put("/api/courriers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courrier)))
            .andExpect(status().isBadRequest());

        // Validate the Courrier in the database
        List<Courrier> courrierList = courrierRepository.findAll();
        assertThat(courrierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCourrier() throws Exception {
        // Initialize the database
        courrierService.save(courrier);

        int databaseSizeBeforeDelete = courrierRepository.findAll().size();

        // Delete the courrier
        restCourrierMockMvc.perform(delete("/api/courriers/{id}", courrier.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Courrier> courrierList = courrierRepository.findAll();
        assertThat(courrierList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Courrier.class);
        Courrier courrier1 = new Courrier();
        courrier1.setId(1L);
        Courrier courrier2 = new Courrier();
        courrier2.setId(courrier1.getId());
        assertThat(courrier1).isEqualTo(courrier2);
        courrier2.setId(2L);
        assertThat(courrier1).isNotEqualTo(courrier2);
        courrier1.setId(null);
        assertThat(courrier1).isNotEqualTo(courrier2);
    }
}
