package fr.sncf.cpr.trecc.web.rest;

import fr.sncf.cpr.trecc.TreccApp;
import fr.sncf.cpr.trecc.domain.ParamNotif;
import fr.sncf.cpr.trecc.repository.ParamNotifRepository;
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
 * Integration tests for the {@Link ParamNotifResource} REST controller.
 */
@SpringBootTest(classes = TreccApp.class)
public class ParamNotifResourceIT {

    private static final Long DEFAULT_MAX_ENVOI = 1L;
    private static final Long UPDATED_MAX_ENVOI = 2L;

    private static final Long DEFAULT_ENVOI_EN_COURS = 1L;
    private static final Long UPDATED_ENVOI_EN_COURS = 2L;

    private static final Instant DEFAULT_DEBUT_HORAIRE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DEBUT_HORAIRE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_FIN_HORAIRE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FIN_HORAIRE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ParamNotifRepository paramNotifRepository;

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

    private MockMvc restParamNotifMockMvc;

    private ParamNotif paramNotif;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ParamNotifResource paramNotifResource = new ParamNotifResource(paramNotifRepository);
        this.restParamNotifMockMvc = MockMvcBuilders.standaloneSetup(paramNotifResource)
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
    public static ParamNotif createEntity(EntityManager em) {
        ParamNotif paramNotif = new ParamNotif()
            .maxEnvoi(DEFAULT_MAX_ENVOI)
            .envoiEnCours(DEFAULT_ENVOI_EN_COURS)
            .debutHoraire(DEFAULT_DEBUT_HORAIRE)
            .finHoraire(DEFAULT_FIN_HORAIRE);
        return paramNotif;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ParamNotif createUpdatedEntity(EntityManager em) {
        ParamNotif paramNotif = new ParamNotif()
            .maxEnvoi(UPDATED_MAX_ENVOI)
            .envoiEnCours(UPDATED_ENVOI_EN_COURS)
            .debutHoraire(UPDATED_DEBUT_HORAIRE)
            .finHoraire(UPDATED_FIN_HORAIRE);
        return paramNotif;
    }

    @BeforeEach
    public void initTest() {
        paramNotif = createEntity(em);
    }

    @Test
    @Transactional
    public void createParamNotif() throws Exception {
        int databaseSizeBeforeCreate = paramNotifRepository.findAll().size();

        // Create the ParamNotif
        restParamNotifMockMvc.perform(post("/api/param-notifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paramNotif)))
            .andExpect(status().isCreated());

        // Validate the ParamNotif in the database
        List<ParamNotif> paramNotifList = paramNotifRepository.findAll();
        assertThat(paramNotifList).hasSize(databaseSizeBeforeCreate + 1);
        ParamNotif testParamNotif = paramNotifList.get(paramNotifList.size() - 1);
        assertThat(testParamNotif.getMaxEnvoi()).isEqualTo(DEFAULT_MAX_ENVOI);
        assertThat(testParamNotif.getEnvoiEnCours()).isEqualTo(DEFAULT_ENVOI_EN_COURS);
        assertThat(testParamNotif.getDebutHoraire()).isEqualTo(DEFAULT_DEBUT_HORAIRE);
        assertThat(testParamNotif.getFinHoraire()).isEqualTo(DEFAULT_FIN_HORAIRE);
    }

    @Test
    @Transactional
    public void createParamNotifWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = paramNotifRepository.findAll().size();

        // Create the ParamNotif with an existing ID
        paramNotif.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restParamNotifMockMvc.perform(post("/api/param-notifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paramNotif)))
            .andExpect(status().isBadRequest());

        // Validate the ParamNotif in the database
        List<ParamNotif> paramNotifList = paramNotifRepository.findAll();
        assertThat(paramNotifList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllParamNotifs() throws Exception {
        // Initialize the database
        paramNotifRepository.saveAndFlush(paramNotif);

        // Get all the paramNotifList
        restParamNotifMockMvc.perform(get("/api/param-notifs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(paramNotif.getId().intValue())))
            .andExpect(jsonPath("$.[*].maxEnvoi").value(hasItem(DEFAULT_MAX_ENVOI.intValue())))
            .andExpect(jsonPath("$.[*].envoiEnCours").value(hasItem(DEFAULT_ENVOI_EN_COURS.intValue())))
            .andExpect(jsonPath("$.[*].debutHoraire").value(hasItem(DEFAULT_DEBUT_HORAIRE.toString())))
            .andExpect(jsonPath("$.[*].finHoraire").value(hasItem(DEFAULT_FIN_HORAIRE.toString())));
    }
    
    @Test
    @Transactional
    public void getParamNotif() throws Exception {
        // Initialize the database
        paramNotifRepository.saveAndFlush(paramNotif);

        // Get the paramNotif
        restParamNotifMockMvc.perform(get("/api/param-notifs/{id}", paramNotif.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(paramNotif.getId().intValue()))
            .andExpect(jsonPath("$.maxEnvoi").value(DEFAULT_MAX_ENVOI.intValue()))
            .andExpect(jsonPath("$.envoiEnCours").value(DEFAULT_ENVOI_EN_COURS.intValue()))
            .andExpect(jsonPath("$.debutHoraire").value(DEFAULT_DEBUT_HORAIRE.toString()))
            .andExpect(jsonPath("$.finHoraire").value(DEFAULT_FIN_HORAIRE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingParamNotif() throws Exception {
        // Get the paramNotif
        restParamNotifMockMvc.perform(get("/api/param-notifs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateParamNotif() throws Exception {
        // Initialize the database
        paramNotifRepository.saveAndFlush(paramNotif);

        int databaseSizeBeforeUpdate = paramNotifRepository.findAll().size();

        // Update the paramNotif
        ParamNotif updatedParamNotif = paramNotifRepository.findById(paramNotif.getId()).get();
        // Disconnect from session so that the updates on updatedParamNotif are not directly saved in db
        em.detach(updatedParamNotif);
        updatedParamNotif
            .maxEnvoi(UPDATED_MAX_ENVOI)
            .envoiEnCours(UPDATED_ENVOI_EN_COURS)
            .debutHoraire(UPDATED_DEBUT_HORAIRE)
            .finHoraire(UPDATED_FIN_HORAIRE);

        restParamNotifMockMvc.perform(put("/api/param-notifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedParamNotif)))
            .andExpect(status().isOk());

        // Validate the ParamNotif in the database
        List<ParamNotif> paramNotifList = paramNotifRepository.findAll();
        assertThat(paramNotifList).hasSize(databaseSizeBeforeUpdate);
        ParamNotif testParamNotif = paramNotifList.get(paramNotifList.size() - 1);
        assertThat(testParamNotif.getMaxEnvoi()).isEqualTo(UPDATED_MAX_ENVOI);
        assertThat(testParamNotif.getEnvoiEnCours()).isEqualTo(UPDATED_ENVOI_EN_COURS);
        assertThat(testParamNotif.getDebutHoraire()).isEqualTo(UPDATED_DEBUT_HORAIRE);
        assertThat(testParamNotif.getFinHoraire()).isEqualTo(UPDATED_FIN_HORAIRE);
    }

    @Test
    @Transactional
    public void updateNonExistingParamNotif() throws Exception {
        int databaseSizeBeforeUpdate = paramNotifRepository.findAll().size();

        // Create the ParamNotif

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restParamNotifMockMvc.perform(put("/api/param-notifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paramNotif)))
            .andExpect(status().isBadRequest());

        // Validate the ParamNotif in the database
        List<ParamNotif> paramNotifList = paramNotifRepository.findAll();
        assertThat(paramNotifList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteParamNotif() throws Exception {
        // Initialize the database
        paramNotifRepository.saveAndFlush(paramNotif);

        int databaseSizeBeforeDelete = paramNotifRepository.findAll().size();

        // Delete the paramNotif
        restParamNotifMockMvc.perform(delete("/api/param-notifs/{id}", paramNotif.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<ParamNotif> paramNotifList = paramNotifRepository.findAll();
        assertThat(paramNotifList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ParamNotif.class);
        ParamNotif paramNotif1 = new ParamNotif();
        paramNotif1.setId(1L);
        ParamNotif paramNotif2 = new ParamNotif();
        paramNotif2.setId(paramNotif1.getId());
        assertThat(paramNotif1).isEqualTo(paramNotif2);
        paramNotif2.setId(2L);
        assertThat(paramNotif1).isNotEqualTo(paramNotif2);
        paramNotif1.setId(null);
        assertThat(paramNotif1).isNotEqualTo(paramNotif2);
    }
}
