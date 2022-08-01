INSERT INTO Image ([Name], [Body])
SELECT 'Mako3', *
FROM OPENROWSET(BULK N'C:\Users\natha\workspace\VS\DISC\DISC\client\public\images\Mako3.png', SINGLE_BLOB) image;
