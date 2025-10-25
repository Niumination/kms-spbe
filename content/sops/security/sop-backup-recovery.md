---
title: SOP Backup dan Disaster Recovery
description: Prosedur backup data dan pemulihan sistem saat terjadi bencana
author: Tim IT KMS SPBE
tags:
  - sop
  - backup
  - disaster-recovery
  - security
  - business-continuity
category: sops
access_level: restricted
content_type: sop
created_at: 2024-01-20
---

# SOP Backup dan Disaster Recovery

## 1. Tujuan
Memastikan ketersediaan dan integritas data KMS SPBE melalui prosedur backup yang teratur dan rencana pemulihan bencana yang efektif.

## 2. Ruang Lingkup
- Database (Supabase)
- File storage (Vercel Blob/S3)
- Configuration files
- User data
- Content repository

## 3. Backup Strategy

### 3.1 Backup Schedule

#### Daily Backup (Incremental)
- **Time**: 02:00 WIB
- **Retention**: 7 hari
- **Target**:
  - Database changes
  - New uploaded files
  - User activity logs

#### Weekly Backup (Differential)
- **Time**: Minggu, 01:00 WIB
- **Retention**: 4 minggu
- **Target**:
  - Full database snapshot
  - All files
  - Configuration

#### Monthly Backup (Full)
- **Time**: Tanggal 1, 00:00 WIB
- **Retention**: 12 bulan
- **Target**:
  - Complete system snapshot
  - All data and files
  - System configuration
  - Application code

### 3.2 Backup Locations

#### Primary Backup
- **Location**: Supabase automated backup
- **Type**: Real-time replication
- **Region**: Singapore (ap-southeast-1)

#### Secondary Backup
- **Location**: AWS S3 (separate account)
- **Type**: Daily sync
- **Region**: Jakarta (ap-southeast-3)

#### Tertiary Backup (Offline)
- **Location**: NAS di data center instansi
- **Type**: Weekly full backup
- **Encryption**: AES-256

## 4. Backup Procedures

### 4.1 Database Backup

```bash
#!/bin/bash
# backup-database.sh

# Configuration
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/database"
SUPABASE_PROJECT="your-project-ref"

# Create backup
supabase db dump \
  --project-ref $SUPABASE_PROJECT \
  --output "$BACKUP_DIR/db_backup_$DATE.sql"

# Compress
gzip "$BACKUP_DIR/db_backup_$DATE.sql"

# Upload to S3
aws s3 cp \
  "$BACKUP_DIR/db_backup_$DATE.sql.gz" \
  "s3://kms-spbe-backups/database/$DATE/"

# Verify
if [ $? -eq 0 ]; then
  echo "Backup successful: $DATE"
  # Send notification
  curl -X POST https://api.telegram.org/bot<TOKEN>/sendMessage \
    -d chat_id=<CHAT_ID> \
    -d text="✅ Database backup completed: $DATE"
else
  echo "Backup failed: $DATE"
  # Alert
  curl -X POST https://api.telegram.org/bot<TOKEN>/sendMessage \
    -d chat_id=<CHAT_ID> \
    -d text="❌ Database backup FAILED: $DATE"
fi

# Cleanup old backups (keep last 7 days)
find $BACKUP_DIR -name "*.gz" -mtime +7 -delete

4.2 File Storage Backup
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

4.3 Configuration Backup
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


5. Recovery Procedures
5.1 Database Recovery
Scenario 1: Data Corruption (Partial)

-- Restore specific table from backup
-- 1. Download backup
aws s3 cp s3://kms-spbe-backups/database/20240120/db_backup.sql.gz .

-- 2. Extract
gunzip db_backup.sql.gz

-- 3. Restore specific table
psql -h db.supabase.co -U postgres -d kms_spbe \
  -c "DROP TABLE IF EXISTS profiles CASCADE;"

psql -h db.supabase.co -U postgres -d kms_spbe \
  < db_backup.sql

-- 4. Verify
SELECT COUNT(*) FROM profiles;

Scenario 2: Complete Database Loss

# 1. Create new Supabase project
supabase projects create kms-spbe-recovery

# 2. Get latest full backup
aws s3 cp s3://kms-spbe-backups/database/latest/db_full.sql.gz .

# 3. Restore
gunzip db_full.sql.gz
supabase db push --project-ref new-project-ref

# 4. Verify data integrity
npm run verify-data

# 5. Update DNS/connections to new instance

5.2 File Recovery
# Restore files from specific date
aws s3 sync \
  s3://kms-spbe-backups/storage/20240120/ \
  s3://kms-spbe-storage/ \
  --delete

5.3 Complete System Recovery

RTO (Recovery Time Objective): 4 hours
RPO (Recovery Point Objective): 24 hours

Step-by-step:

    Setup New Infrastructure (1 hour)

# Deploy to Vercel
vercel --prod

# Create Supabase project
supabase projects create kms-spbe-new

Restore Database (1 hour)
# Get latest backup
aws s3 cp s3://kms-spbe-backups/database/latest/ . --recursive

# Restore
supabase db restore --file db_backup_latest.sql
Restore Files (1 hour)
# Sync storage
aws s3 sync s3://kms-spbe-backups/storage/latest/ s3://new-bucket/
Configure & Test (1 hour)
# Update environment variables
# Run smoke tests
npm run test:smoke

# Verify critical functions
npm run test:critical
Switch Traffic
# Update DNS
# Monitor for 15 minutes
# If stable, complete recovery
6. Testing & Verification
6.1 Monthly Recovery Drill

First Monday of each month:

    Select random backup dari minggu lalu

    Restore to staging environment

    Verify data integrity:

-- Check row counts
SELECT 
  'profiles' as table_name,
  COUNT(*) as row_count
FROM profiles
UNION ALL
SELECT 'contents', COUNT(*) FROM contents;

-- Verify referential integrity
SELECT COUNT(*) FROM contents c
LEFT JOIN profiles p ON c.author_id = p.id
WHERE c.author_id IS NOT NULL AND p.id IS NULL;



    Test critical functions

    Document results

    Update procedures if issues found

6.2 Quarterly Full Disaster Recovery Test

Last weekend of quarter:

    Simulate complete system failure
    Execute full recovery procedure
    Measure RTO and RPO
    Document lessons learned
    Update disaster recovery plan

7. Monitoring & Alerting
7.1 Backup Monitoring

// monitoring/backup-monitor.ts
import { createClient } from '@supabase/supabase-js';

async function checkBackupStatus() {
  // Check last backup time
  const lastBackup = await getLastBackupTime();
  const hoursSinceBackup = (Date.now() - lastBackup) / (1000 * 60 * 60);
  
  if (hoursSinceBackup > 25) {
    // Alert: Backup overdue
    await sendAlert({
      severity: 'HIGH',
      message: `Backup overdue: ${hoursSinceBackup.toFixed(1)} hours since last backup`,
      action: 'Check backup cron job'
    });
  }
  
  // Verify backup integrity
  const latestBackup = await getLatestBackup();
  const isValid = await verifyBackupIntegrity(latestBackup);
  
  if (!isValid) {
    await sendAlert({
      severity: 'CRITICAL',
      message: 'Latest backup failed integrity check',
      action: 'Investigate backup corruption'
    });
  }
}

// Run every hour
setInterval(checkBackupStatus, 60 * 60 * 1000);

7.2 Alert Channels

    Email: admin@kms-spbe.go.id
    Telegram: Backup Alert Group
    SMS: IT Manager (critical only)
    Dashboard: Real-time backup status

8. Data Retention Policy
Data Type	Retention Period	Reason
User data	While account active + 90 days	Compliance
Content	Indefinite	Business requirement
Logs	1 year	Audit requirement
Backups (daily)	7 days	Storage optimization
Backups (weekly)	4 weeks	Balance cost/safety
Backups (monthly)	12 months	Legal requirement
Backups (yearly)	7 years	Archive requirement

9. Security Considerations
9.1 Backup Encryption

    Algorithm: AES-256-GCM
    Key management: AWS KMS
    Key rotation: Every 90 days

9.2 Access Control

    Backup files: Admin only
    Recovery procedures: IT Manager approval required
    Encryption keys: Split custody (requires 2 of 3 keyholders)

9.3 Transfer Security

    All transfers via TLS 1.3
    VPN for sensitive operations
    Audit logs for all backup/restore operations

10. Compliance
10.1 Regulatory Requirements

    Perpres 95/2018 (SPBE): Data availability
    PP 71/2019: Data protection
    ISO 27001: Backup requirements

10.2 Audit Trail

Every backup/restore operation logs:

    Timestamp
    Operator
    Operation type
    Success/failure status
    Data affected
    Duration

11. Roles & Responsibilities
Role	Responsibilities
Backup Operator	Execute daily backups, monitor alerts
DBA	Database backups, verify integrity
IT Manager	Approve recovery operations, test drills
Security Officer	Audit logs, encryption compliance
Business Owner	Define RTO/RPO, approve policy changes
12. Contact Information

Normal Hours (08:00-17:00 WIB):

    Backup Team: backup@kms-spbe.go.id
    Phone: 021-1234-5678 ext. 200

After Hours / Emergency:

    On-call Admin: +62 813-9999-8888
    IT Manager: +62 812-8888-7777

13. Appendix
A. Backup Checklist

    Verify backup schedule running
    Check backup logs for errors
    Verify offsite copy exists
    Test restore procedure monthly
    Update documentation
    Review retention compliance

B. Recovery Checklist

    Assess damage extent
    Notify stakeholders
    Identify recovery point
    Execute recovery procedure
    Verify data integrity
    Test system functionality
    Document incident
    Conduct post-mortem

Document Control:

    Version: 1.0
    Last Updated: 2024-01-20
    Next Review: 2024-07-20
    Owner: IT Manager
    Classification: RESTRICTED

