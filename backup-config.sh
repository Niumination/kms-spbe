#!/bin/bash
# backup-config.sh

# Backup .env files (encrypted)
tar -czf config_backup.tar.gz \
  .env.local \
  .env.production \
  next.config.ts \
  supabase/config.toml

# Encrypt
gpg --encrypt \
  --recipient admin@kms-spbe.go.id \
  config_backup.tar.gz

# Upload
aws s3 cp config_backup.tar.gz.gpg \
  s3://kms-spbe-backups/config/
