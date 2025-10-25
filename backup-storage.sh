#!/bin/bash
# backup-storage.sh

DATE=$(date +%Y%m%d_%H%M%S)
SOURCE_BUCKET="kms-spbe-storage"
BACKUP_BUCKET="kms-spbe-backups"

# Sync files
aws s3 sync \
  "s3://$SOURCE_BUCKET" \
  "s3://$BACKUP_BUCKET/storage/$DATE/" \
  --delete

# Verify
SYNC_STATUS=$?
if [ $SYNC_STATUS -eq 0 ]; then
  echo "Storage backup successful"
else
  echo "Storage backup failed"
  # Alert admin
fi
