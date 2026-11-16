package com.example.owp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "user_avatar")
public class UserAvatar {
    @Id
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "content_type", nullable = false)
    private String contentType;

    @Column(nullable = false)
    private byte[] data;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    public Integer getUserId() {return this.userId; }

    public void setUserId(Integer userId) {this.userId = userId;}

    public String getContentType() { return this.contentType; }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public byte[] getData() {
        return this.data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public Instant getUpdatedAt() {return this.updatedAt; }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
