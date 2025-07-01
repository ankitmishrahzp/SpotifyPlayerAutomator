package com.example.securefileapp.repository;

import com.example.securefileapp.model.StoredFile;
import com.example.securefileapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface StoredFileRepository extends JpaRepository<StoredFile, Long> {
    List<StoredFile> findByOwner(User owner);
    Optional<StoredFile> findByShareToken(String shareToken);
} 