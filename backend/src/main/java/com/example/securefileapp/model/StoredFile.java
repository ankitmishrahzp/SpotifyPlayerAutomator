package com.example.securefileapp.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.Instant;

@Entity
@Data
public class StoredFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String filename;
    private String originalFilename;
    private String contentType;
    private Long size;
    private Instant uploadTime;

    @ManyToOne
    private User owner;

    private String shareToken;
    private Instant shareTokenExpiry;
} 