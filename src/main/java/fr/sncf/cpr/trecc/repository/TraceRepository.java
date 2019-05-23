package fr.sncf.cpr.trecc.repository;

import fr.sncf.cpr.trecc.domain.Trace;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Trace entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TraceRepository extends JpaRepository<Trace, Long> {

}
