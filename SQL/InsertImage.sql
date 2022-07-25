select * from image
select * from disc



INSERT INTO Image ([Name], [Image])
SELECT 'Instinct', *
FROM OPENROWSET(BULK N'C:\Users\natha\workspace\VS\DISC\DISC\client\public\images\Instinct.png', SINGLE_BLOB) image;

UPDATE Disc
SET ImageId = 6
WHERE Id=16;