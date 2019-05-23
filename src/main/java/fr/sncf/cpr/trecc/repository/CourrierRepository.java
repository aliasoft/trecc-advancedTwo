package fr.sncf.cpr.trecc.repository;

import fr.sncf.cpr.trecc.domain.Courrier;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Courrier entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CourrierRepository extends JpaRepository<Courrier, Long> {

}
