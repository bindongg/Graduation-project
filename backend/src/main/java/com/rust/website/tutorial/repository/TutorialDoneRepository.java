package com.rust.website.tutorial.repository;

import com.rust.website.tutorial.model.entity.TutorialDone;
import com.rust.website.tutorial.model.entity.TutorialDoneKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TutorialDoneRepository extends JpaRepository<TutorialDone, TutorialDoneKey> {
    public int countByUser_id(String user_id);

    public TutorialDone findByUser_idAndTutorialId(String user_id, int tutorial_id);

    @Modifying
    @Query(value = "insert into TutorialDone (user_id, tutorial_id, date) VALUES (?1, ?2, now())", nativeQuery = true)
    public void insert(String user_id, int tutorial_id);
}
