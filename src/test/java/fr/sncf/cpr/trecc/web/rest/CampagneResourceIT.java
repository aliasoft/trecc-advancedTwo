package fr.sncf.cpr.trecc.web.rest;

import fr.sncf.cpr.trecc.TreccApp;
import fr.sncf.cpr.trecc.domain.Campagne;
import fr.sncf.cpr.trecc.repository.CampagneRepository;
import fr.sncf.cpr.trecc.service.CampagneService;
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
 * Integration tests for the {@Link CampagneResource} REST controller.
 */
@SpringBootTest(classes = TreccApp.class)
public class CampagneResourceIT {

    private static final Long DEFAULT_ID_CAMPAGNE = 1L;
    private static final Long UPDATED_ID_CAMPAGNE = 2L;

    private static final String DEFAULT_STATUT = "AAAAAAAAAA";
    private static final String UPDATED_STATUT = "BBBBBBBBBB";

    private static final String DEFAULT_FICHIER = "AAAAAAAAAA";
    private static final String UPDATED_FICHIER = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_DEBUT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_DEBUT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATE_FIN = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_FIN = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private CampagneRepository campagneRepository;

    @Autowired
    private CampagneService campagneService;

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

    private MockMvc restCampagneMockMvc;

    private Campagne campagne;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CampagneResource campagneResource = new CampagneResource(campagneService);
        this.restCampagneMockMvc = MockMvcBuilders.standaloneSetup(campagneResource)
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
    public static Campagne createEntity(EntityManager em) {
        Campagne campagne = new Campagne()
            .idCampagne(DEFAULT_ID_CAMPAGNE)
            .statut(DEFAULT_STATUT)
            .fichier(DEFAULT_FICHIER)
            .dateDebut(DEFAULT_DATE_DEBUT)
            .dateFin(DEFAULT_DATE_FIN);
        return campagne;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Campagne createUpdatedEntity(EntityManager em) {
        Campagne campagne = new Campagne()
            .idCampagne(UPDATED_ID_CAMPAGNE)
            .statut(UPDATED_STATUT)
            .fichier(UPDATED_FICHIER)
            .dateDebut(UPDATED_DATE_DEBUT)
            .dateFin(UPDATED_DATE_FIN);
        return campagne;
    }

    @BeforeEach
    public void initTest() {
        campagne = createEntity(em);
    }

    @Test
    @Transactional
    public void createCampagne() throws Exception {
        int databaseSizeBeforeCreate = campagneRepository.findAll().size();

        // Create the Campagne
        restCampagneMockMvc.perform(post("/api/campagnes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campagne)))
            .andExpect(status().isCreated());

        // Validate the Campagne in the database
        List<Campagne> campagneList = campagneRepository.findAll();
        assertThat(campagneList).hasSize(databaseSizeBeforeCreate + 1);
        Campagne testCampagne = campagneList.get(campagneList.size() - 1);
        assertThat(testCampagne.getIdCampagne()).isEqualTo(DEFAULT_ID_CAMPAGNE);
        assertThat(testCampagne.getStatut()).isEqualTo(DEFAULT_STATUT);
        assertThat(testCampagne.getFichier()).isEqualTo(DEFAULT_FICHIER);
        assertThat(testCampagne.getDateDebut()).isEqualTo(DEFAULT_DATE_DEBUT);
        assertThat(testCampagne.getDateFin()).isEqualTo(DEFAULT_DATE_FIN);
    }

    @Test
    @Transactional
    public void createCampagneWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = campagneRepository.findAll().size();

        // Create the Campagne with an existing ID
        campagne.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCampagneMockMvc.perform(post("/api/campagnes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campagne)))
            .andExpect(status().isBadRequest());

        // Validate the Campagne in the database
        List<Campagne> campagneList = campagneRepository.findAll();
        assertThat(campagneList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCampagnes() throws Exception {
        // Initialize the database
        campagneRepository.saveAndFlush(campagne);

        // Get all the campagneList
        restCampagneMockMvc.perform(get("/api/campagnes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(campagne.getId().intValue())))
            .andExpect(jsonPath("$.[*].idCampagne").value(hasItem(DEFAULT_ID_CAMPAGNE.intValue())))
            .andExpect(jsonPath("$.[*].statut").value(hasItem(DEFAULT_STATUT.toString())))
            .andExpect(jsonPath("$.[*].fichier").value(hasItem(DEFAULT_FICHIER.toString())))
            .andExpect(jsonPath("$.[*].dateDebut").value(hasItem(DEFAULT_DATE_DEBUT.toString())))
            .andExpect(jsonPath("$.[*].dateFin").value(hasItem(DEFAULT_DATE_FIN.toString())));
    }
    
    @Test
    @Transactional
    public void getCampagne() throws Exception {
        // Initialize the database
        campagneRepository.saveAndFlush(campagne);

        // Get the campagne
        restCampagneMockMvc.perform(get("/api/campagnes/{id}", campagne.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(campagne.getId().intValue()))
            .andExpect(jsonPath("$.idCampagne").value(DEFAULT_ID_CAMPAGNE.intValue()))
            .andExpect(jsonPath("$.statut").value(DEFAULT_STATUT.toString()))
            .andExpect(jsonPath("$.fichier").value(DEFAULT_FICHIER.toString()))
            .andExpect(jsonPath("$.dateDebut").value(DEFAULT_DATE_DEBUT.toString()))
            .andExpect(jsonPath("$.dateFin").value(DEFAULT_DATE_FIN.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCampagne() throws Exception {
        // Get the campagne
        restCampagneMockMvc.perform(get("/api/campagnes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCampagne() throws Exception {
        // Initialize the database
        campagneService.save(campagne);

        int databaseSizeBeforeUpdate = campagneRepository.findAll().size();

        // Update the campagne
        Campagne updatedCampagne = campagneRepository.findById(campagne.getId()).get();
        // Disconnect from session so that the updates on updatedCampagne are not directly saved in db
        em.detach(updatedCampagne);
        updatedCampagne
            .idCampagne(UPDATED_ID_CAMPAGNE)
            .statut(UPDATED_STATUT)
            .fichier(UPDATED_FICHIER)
            .dateDebut(UPDATED_DATE_DEBUT)
            .dateFin(UPDATED_DATE_FIN);

        restCampagneMockMvc.perform(put("/api/campagnes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCampagne)))
            .andExpect(status().isOk());

        // Validate the Campagne in the database
        List<Campagne> campagneList = campagneRepository.findAll();
        assertThat(campagneList).hasSize(databaseSizeBeforeUpdate);
        Campagne testCampagne = campagneList.get(campagneList.size() - 1);
        assertThat(testCampagne.getIdCampagne()).isEqualTo(UPDATED_ID_CAMPAGNE);
        assertThat(testCampagne.getStatut()).isEqualTo(UPDATED_STATUT);
        assertThat(testCampagne.getFichier()).isEqualTo(UPDATED_FICHIER);
        assertThat(testCampagne.getDateDebut()).isEqualTo(UPDATED_DATE_DEBUT);
        assertThat(testCampagne.getDateFin()).isEqualTo(UPDATED_DATE_FIN);
    }

    @Test
    @Transactional
    public void updateNonExistingCampagne() throws Exception {
        int databaseSizeBeforeUpdate = campagneRepository.findAll().size();

        // Create the Campagne

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCampagneMockMvc.perform(put("/api/campagnes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campagne)))
            .andExpect(status().isBadRequest());

        // Validate the Campagne in the database
        List<Campagne> campagneList = campagneRepository.findAll();
        assertThat(campagneList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCampagne() throws Exception {
        // Initialize the database
        campagneService.save(campagne);

        int databaseSizeBeforeDelete = campagneRepository.findAll().size();

        // Delete the campagne
        restCampagneMockMvc.perform(delete("/api/campagnes/{id}", campagne.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Campagne> campagneList = campagneRepository.findAll();
        assertThat(campagneList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Campagne.class);
        Campagne campagne1 = new Campagne();
        campagne1.setId(1L);
        Campagne campagne2 = new Campagne();
        campagne2.setId(campagne1.getId());
        assertThat(campagne1).isEqualTo(campagne2);
        campagne2.setId(2L);
        assertThat(campagne1).isNotEqualTo(campagne2);
        campagne1.setId(null);
        assertThat(campagne1).isNotEqualTo(campagne2);
    }
}
