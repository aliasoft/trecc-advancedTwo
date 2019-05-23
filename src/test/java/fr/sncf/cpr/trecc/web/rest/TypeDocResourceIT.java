package fr.sncf.cpr.trecc.web.rest;

import fr.sncf.cpr.trecc.TreccApp;
import fr.sncf.cpr.trecc.domain.TypeDoc;
import fr.sncf.cpr.trecc.repository.TypeDocRepository;
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
import java.util.List;

import static fr.sncf.cpr.trecc.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link TypeDocResource} REST controller.
 */
@SpringBootTest(classes = TreccApp.class)
public class TypeDocResourceIT {

    private static final Long DEFAULT_TYPE_DOC = 1L;
    private static final Long UPDATED_TYPE_DOC = 2L;

    private static final String DEFAULT_NOM_COURRIER = "AAAAAAAAAA";
    private static final String UPDATED_NOM_COURRIER = "BBBBBBBBBB";

    private static final String DEFAULT_NOM_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_NOM_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_NOM_EP = "AAAAAAAAAA";
    private static final String UPDATED_NOM_EP = "BBBBBBBBBB";

    @Autowired
    private TypeDocRepository typeDocRepository;

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

    private MockMvc restTypeDocMockMvc;

    private TypeDoc typeDoc;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TypeDocResource typeDocResource = new TypeDocResource(typeDocRepository);
        this.restTypeDocMockMvc = MockMvcBuilders.standaloneSetup(typeDocResource)
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
    public static TypeDoc createEntity(EntityManager em) {
        TypeDoc typeDoc = new TypeDoc()
            .typeDoc(DEFAULT_TYPE_DOC)
            .nomCourrier(DEFAULT_NOM_COURRIER)
            .nomEmail(DEFAULT_NOM_EMAIL)
            .nomEp(DEFAULT_NOM_EP);
        return typeDoc;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TypeDoc createUpdatedEntity(EntityManager em) {
        TypeDoc typeDoc = new TypeDoc()
            .typeDoc(UPDATED_TYPE_DOC)
            .nomCourrier(UPDATED_NOM_COURRIER)
            .nomEmail(UPDATED_NOM_EMAIL)
            .nomEp(UPDATED_NOM_EP);
        return typeDoc;
    }

    @BeforeEach
    public void initTest() {
        typeDoc = createEntity(em);
    }

    @Test
    @Transactional
    public void createTypeDoc() throws Exception {
        int databaseSizeBeforeCreate = typeDocRepository.findAll().size();

        // Create the TypeDoc
        restTypeDocMockMvc.perform(post("/api/type-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeDoc)))
            .andExpect(status().isCreated());

        // Validate the TypeDoc in the database
        List<TypeDoc> typeDocList = typeDocRepository.findAll();
        assertThat(typeDocList).hasSize(databaseSizeBeforeCreate + 1);
        TypeDoc testTypeDoc = typeDocList.get(typeDocList.size() - 1);
        assertThat(testTypeDoc.getTypeDoc()).isEqualTo(DEFAULT_TYPE_DOC);
        assertThat(testTypeDoc.getNomCourrier()).isEqualTo(DEFAULT_NOM_COURRIER);
        assertThat(testTypeDoc.getNomEmail()).isEqualTo(DEFAULT_NOM_EMAIL);
        assertThat(testTypeDoc.getNomEp()).isEqualTo(DEFAULT_NOM_EP);
    }

    @Test
    @Transactional
    public void createTypeDocWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = typeDocRepository.findAll().size();

        // Create the TypeDoc with an existing ID
        typeDoc.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTypeDocMockMvc.perform(post("/api/type-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeDoc)))
            .andExpect(status().isBadRequest());

        // Validate the TypeDoc in the database
        List<TypeDoc> typeDocList = typeDocRepository.findAll();
        assertThat(typeDocList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTypeDocs() throws Exception {
        // Initialize the database
        typeDocRepository.saveAndFlush(typeDoc);

        // Get all the typeDocList
        restTypeDocMockMvc.perform(get("/api/type-docs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(typeDoc.getId().intValue())))
            .andExpect(jsonPath("$.[*].typeDoc").value(hasItem(DEFAULT_TYPE_DOC.intValue())))
            .andExpect(jsonPath("$.[*].nomCourrier").value(hasItem(DEFAULT_NOM_COURRIER.toString())))
            .andExpect(jsonPath("$.[*].nomEmail").value(hasItem(DEFAULT_NOM_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].nomEp").value(hasItem(DEFAULT_NOM_EP.toString())));
    }
    
    @Test
    @Transactional
    public void getTypeDoc() throws Exception {
        // Initialize the database
        typeDocRepository.saveAndFlush(typeDoc);

        // Get the typeDoc
        restTypeDocMockMvc.perform(get("/api/type-docs/{id}", typeDoc.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(typeDoc.getId().intValue()))
            .andExpect(jsonPath("$.typeDoc").value(DEFAULT_TYPE_DOC.intValue()))
            .andExpect(jsonPath("$.nomCourrier").value(DEFAULT_NOM_COURRIER.toString()))
            .andExpect(jsonPath("$.nomEmail").value(DEFAULT_NOM_EMAIL.toString()))
            .andExpect(jsonPath("$.nomEp").value(DEFAULT_NOM_EP.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTypeDoc() throws Exception {
        // Get the typeDoc
        restTypeDocMockMvc.perform(get("/api/type-docs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTypeDoc() throws Exception {
        // Initialize the database
        typeDocRepository.saveAndFlush(typeDoc);

        int databaseSizeBeforeUpdate = typeDocRepository.findAll().size();

        // Update the typeDoc
        TypeDoc updatedTypeDoc = typeDocRepository.findById(typeDoc.getId()).get();
        // Disconnect from session so that the updates on updatedTypeDoc are not directly saved in db
        em.detach(updatedTypeDoc);
        updatedTypeDoc
            .typeDoc(UPDATED_TYPE_DOC)
            .nomCourrier(UPDATED_NOM_COURRIER)
            .nomEmail(UPDATED_NOM_EMAIL)
            .nomEp(UPDATED_NOM_EP);

        restTypeDocMockMvc.perform(put("/api/type-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTypeDoc)))
            .andExpect(status().isOk());

        // Validate the TypeDoc in the database
        List<TypeDoc> typeDocList = typeDocRepository.findAll();
        assertThat(typeDocList).hasSize(databaseSizeBeforeUpdate);
        TypeDoc testTypeDoc = typeDocList.get(typeDocList.size() - 1);
        assertThat(testTypeDoc.getTypeDoc()).isEqualTo(UPDATED_TYPE_DOC);
        assertThat(testTypeDoc.getNomCourrier()).isEqualTo(UPDATED_NOM_COURRIER);
        assertThat(testTypeDoc.getNomEmail()).isEqualTo(UPDATED_NOM_EMAIL);
        assertThat(testTypeDoc.getNomEp()).isEqualTo(UPDATED_NOM_EP);
    }

    @Test
    @Transactional
    public void updateNonExistingTypeDoc() throws Exception {
        int databaseSizeBeforeUpdate = typeDocRepository.findAll().size();

        // Create the TypeDoc

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTypeDocMockMvc.perform(put("/api/type-docs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeDoc)))
            .andExpect(status().isBadRequest());

        // Validate the TypeDoc in the database
        List<TypeDoc> typeDocList = typeDocRepository.findAll();
        assertThat(typeDocList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTypeDoc() throws Exception {
        // Initialize the database
        typeDocRepository.saveAndFlush(typeDoc);

        int databaseSizeBeforeDelete = typeDocRepository.findAll().size();

        // Delete the typeDoc
        restTypeDocMockMvc.perform(delete("/api/type-docs/{id}", typeDoc.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<TypeDoc> typeDocList = typeDocRepository.findAll();
        assertThat(typeDocList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TypeDoc.class);
        TypeDoc typeDoc1 = new TypeDoc();
        typeDoc1.setId(1L);
        TypeDoc typeDoc2 = new TypeDoc();
        typeDoc2.setId(typeDoc1.getId());
        assertThat(typeDoc1).isEqualTo(typeDoc2);
        typeDoc2.setId(2L);
        assertThat(typeDoc1).isNotEqualTo(typeDoc2);
        typeDoc1.setId(null);
        assertThat(typeDoc1).isNotEqualTo(typeDoc2);
    }
}
