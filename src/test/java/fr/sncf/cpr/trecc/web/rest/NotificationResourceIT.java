package fr.sncf.cpr.trecc.web.rest;

import fr.sncf.cpr.trecc.TreccApp;
import fr.sncf.cpr.trecc.domain.Notification;
import fr.sncf.cpr.trecc.repository.NotificationRepository;
import fr.sncf.cpr.trecc.service.NotificationService;
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
 * Integration tests for the {@Link NotificationResource} REST controller.
 */
@SpringBootTest(classes = TreccApp.class)
public class NotificationResourceIT {

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
    private NotificationRepository notificationRepository;

    @Autowired
    private NotificationService notificationService;

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

    private MockMvc restNotificationMockMvc;

    private Notification notification;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NotificationResource notificationResource = new NotificationResource(notificationService);
        this.restNotificationMockMvc = MockMvcBuilders.standaloneSetup(notificationResource)
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
    public static Notification createEntity(EntityManager em) {
        Notification notification = new Notification()
            .idTrace(DEFAULT_ID_TRACE)
            .typeCourrier(DEFAULT_TYPE_COURRIER)
            .timestampProcess(DEFAULT_TIMESTAMP_PROCESS)
            .idCpr(DEFAULT_ID_CPR)
            .nir(DEFAULT_NIR)
            .adresseEntrante(DEFAULT_ADRESSE_ENTRANTE)
            .adresseEnrichie(DEFAULT_ADRESSE_ENRICHIE)
            .email(DEFAULT_EMAIL)
            .erreur(DEFAULT_ERREUR);
        return notification;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Notification createUpdatedEntity(EntityManager em) {
        Notification notification = new Notification()
            .idTrace(UPDATED_ID_TRACE)
            .typeCourrier(UPDATED_TYPE_COURRIER)
            .timestampProcess(UPDATED_TIMESTAMP_PROCESS)
            .idCpr(UPDATED_ID_CPR)
            .nir(UPDATED_NIR)
            .adresseEntrante(UPDATED_ADRESSE_ENTRANTE)
            .adresseEnrichie(UPDATED_ADRESSE_ENRICHIE)
            .email(UPDATED_EMAIL)
            .erreur(UPDATED_ERREUR);
        return notification;
    }

    @BeforeEach
    public void initTest() {
        notification = createEntity(em);
    }

    @Test
    @Transactional
    public void createNotification() throws Exception {
        int databaseSizeBeforeCreate = notificationRepository.findAll().size();

        // Create the Notification
        restNotificationMockMvc.perform(post("/api/notifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(notification)))
            .andExpect(status().isCreated());

        // Validate the Notification in the database
        List<Notification> notificationList = notificationRepository.findAll();
        assertThat(notificationList).hasSize(databaseSizeBeforeCreate + 1);
        Notification testNotification = notificationList.get(notificationList.size() - 1);
        assertThat(testNotification.getIdTrace()).isEqualTo(DEFAULT_ID_TRACE);
        assertThat(testNotification.getTypeCourrier()).isEqualTo(DEFAULT_TYPE_COURRIER);
        assertThat(testNotification.getTimestampProcess()).isEqualTo(DEFAULT_TIMESTAMP_PROCESS);
        assertThat(testNotification.getIdCpr()).isEqualTo(DEFAULT_ID_CPR);
        assertThat(testNotification.getNir()).isEqualTo(DEFAULT_NIR);
        assertThat(testNotification.getAdresseEntrante()).isEqualTo(DEFAULT_ADRESSE_ENTRANTE);
        assertThat(testNotification.getAdresseEnrichie()).isEqualTo(DEFAULT_ADRESSE_ENRICHIE);
        assertThat(testNotification.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testNotification.getErreur()).isEqualTo(DEFAULT_ERREUR);
    }

    @Test
    @Transactional
    public void createNotificationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = notificationRepository.findAll().size();

        // Create the Notification with an existing ID
        notification.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNotificationMockMvc.perform(post("/api/notifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(notification)))
            .andExpect(status().isBadRequest());

        // Validate the Notification in the database
        List<Notification> notificationList = notificationRepository.findAll();
        assertThat(notificationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllNotifications() throws Exception {
        // Initialize the database
        notificationRepository.saveAndFlush(notification);

        // Get all the notificationList
        restNotificationMockMvc.perform(get("/api/notifications?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(notification.getId().intValue())))
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
    public void getNotification() throws Exception {
        // Initialize the database
        notificationRepository.saveAndFlush(notification);

        // Get the notification
        restNotificationMockMvc.perform(get("/api/notifications/{id}", notification.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(notification.getId().intValue()))
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
    public void getNonExistingNotification() throws Exception {
        // Get the notification
        restNotificationMockMvc.perform(get("/api/notifications/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNotification() throws Exception {
        // Initialize the database
        notificationService.save(notification);

        int databaseSizeBeforeUpdate = notificationRepository.findAll().size();

        // Update the notification
        Notification updatedNotification = notificationRepository.findById(notification.getId()).get();
        // Disconnect from session so that the updates on updatedNotification are not directly saved in db
        em.detach(updatedNotification);
        updatedNotification
            .idTrace(UPDATED_ID_TRACE)
            .typeCourrier(UPDATED_TYPE_COURRIER)
            .timestampProcess(UPDATED_TIMESTAMP_PROCESS)
            .idCpr(UPDATED_ID_CPR)
            .nir(UPDATED_NIR)
            .adresseEntrante(UPDATED_ADRESSE_ENTRANTE)
            .adresseEnrichie(UPDATED_ADRESSE_ENRICHIE)
            .email(UPDATED_EMAIL)
            .erreur(UPDATED_ERREUR);

        restNotificationMockMvc.perform(put("/api/notifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNotification)))
            .andExpect(status().isOk());

        // Validate the Notification in the database
        List<Notification> notificationList = notificationRepository.findAll();
        assertThat(notificationList).hasSize(databaseSizeBeforeUpdate);
        Notification testNotification = notificationList.get(notificationList.size() - 1);
        assertThat(testNotification.getIdTrace()).isEqualTo(UPDATED_ID_TRACE);
        assertThat(testNotification.getTypeCourrier()).isEqualTo(UPDATED_TYPE_COURRIER);
        assertThat(testNotification.getTimestampProcess()).isEqualTo(UPDATED_TIMESTAMP_PROCESS);
        assertThat(testNotification.getIdCpr()).isEqualTo(UPDATED_ID_CPR);
        assertThat(testNotification.getNir()).isEqualTo(UPDATED_NIR);
        assertThat(testNotification.getAdresseEntrante()).isEqualTo(UPDATED_ADRESSE_ENTRANTE);
        assertThat(testNotification.getAdresseEnrichie()).isEqualTo(UPDATED_ADRESSE_ENRICHIE);
        assertThat(testNotification.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testNotification.getErreur()).isEqualTo(UPDATED_ERREUR);
    }

    @Test
    @Transactional
    public void updateNonExistingNotification() throws Exception {
        int databaseSizeBeforeUpdate = notificationRepository.findAll().size();

        // Create the Notification

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNotificationMockMvc.perform(put("/api/notifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(notification)))
            .andExpect(status().isBadRequest());

        // Validate the Notification in the database
        List<Notification> notificationList = notificationRepository.findAll();
        assertThat(notificationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNotification() throws Exception {
        // Initialize the database
        notificationService.save(notification);

        int databaseSizeBeforeDelete = notificationRepository.findAll().size();

        // Delete the notification
        restNotificationMockMvc.perform(delete("/api/notifications/{id}", notification.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Notification> notificationList = notificationRepository.findAll();
        assertThat(notificationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Notification.class);
        Notification notification1 = new Notification();
        notification1.setId(1L);
        Notification notification2 = new Notification();
        notification2.setId(notification1.getId());
        assertThat(notification1).isEqualTo(notification2);
        notification2.setId(2L);
        assertThat(notification1).isNotEqualTo(notification2);
        notification1.setId(null);
        assertThat(notification1).isNotEqualTo(notification2);
    }
}
