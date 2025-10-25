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
