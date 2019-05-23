package fr.sncf.cpr.trecc.repository;

import fr.sncf.cpr.trecc.domain.ParamNotif;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ParamNotif entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParamNotifRepository extends JpaRepository<ParamNotif, Long> {

}
