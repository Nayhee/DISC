USE [master]

IF db_id('TNdiscs') IS NULL
  CREATE DATABASE [TNdiscs]
GO
USE [TNdiscs]
GO

DROP TABLE IF EXISTS Payment;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS CartDisc;
DROP TABLE IF EXISTS Cart;
DROP TABLE IF EXISTS UserProfile;
DROP TABLE IF EXISTS UserType;
DROP TABLE IF EXISTS DiscTag;
DROP TABLE IF EXISTS Disc;
DROP TABLE IF EXISTS Tag;
DROP TABLE IF EXISTS Brand;
GO

CREATE TABLE Tag (
	Id INTEGER NOT NULL PRIMARY KEY IDENTITY(1, 1),
	[Name] VARCHAR(55) NOT NULL
);
GO

CREATE TABLE Brand (
	Id INTEGER NOT NULL PRIMARY KEY IDENTITY(1, 1),
	[Name] VARCHAR(55) NOT NULL
);
GO

CREATE TABLE CartDisc (
	Id INTEGER NOT NULL PRIMARY KEY IDENTITY(1, 1),
	CartId INTEGER NOT NULL,
	DiscId INTEGER NOT NULL,
	UserProfileId INTEGER NOT NULL,
);
GO

CREATE TABLE Cart (
	Id INTEGER NOT NULL PRIMARY KEY IDENTITY(1, 1),
	UserProfileId INTEGER NOT NULL,
	DateCreated DateTime NOT NULL,
);
GO

CREATE TABLE Orders (
	Id INTEGER NOT NULL PRIMARY KEY IDENTITY(1, 1),
	UserProfileId INTEGER NOT NULL,
	CartId INTEGER NOT NULL,
	OrderDate DATETIME NOT NULL,
	Total DECIMAL NOT NULL,
	ShippingAddress VARCHAR(155) NOT NULL,
	ShippingCity VARCHAR(55) NOT NULL,
	ShippingState VARCHAR(55) NOT NULL,
	ShippingZip VARCHAR(55) NOT NULL,
	IsPaid bit NOT NULL DEFAULT (0)
);
GO

CREATE TABLE Payment (
	Id INTEGER NOT NULL PRIMARY KEY IDENTITY(1, 1),
	OrderId INTEGER NOT NULL,
	UserProfileId INTEGER NOT NULL,
	Amount DECIMAL NOT NULL,
	PaymentDate DATETIME NOT NULL,
);
GO

CREATE TABLE Disc (
	Id INTEGER NOT NULL PRIMARY KEY IDENTITY(1, 1),
	[Name] VARCHAR(55) NOT NULL,
	BrandId INTEGER NOT NULL,
	Condition VARCHAR(55) NOT NULL,
	Speed INTEGER NOT NULL,
	Glide INTEGER NOT NULL,
	Turn INTEGER NOT NULL,
	Fade INTEGER NOT NULL,
	Plastic VARCHAR(55) NOT NULL,
	Price INTEGER NOT NULL,
	ImageUrl VARCHAR(255),
	Description VARCHAR(555),
	Weight INTEGER NOT NULL,
	ForSale bit NOT NULL DEFAULT (1),
);
GO

CREATE TABLE DiscTag (
	Id INTEGER NOT NULL PRIMARY KEY IDENTITY(1, 1),
	DiscId INTEGER NOT NULL,
	TagId INTEGER NOT NULL,
	CONSTRAINT FK_DiscTag_Disc FOREIGN KEY (DiscId) REFERENCES Disc(Id),
	CONSTRAINT FK_DiscTag_Tag FOREIGN KEY (TagId) REFERENCES Tag(Id)
);
GO

CREATE TABLE UserProfile (
	Id INTEGER NOT NULL PRIMARY KEY IDENTITY(1, 1),
	[Name] VARCHAR(55) NOT NULL,
	Email VARCHAR(55) NOT NULL,
	IsAdmin bit NOT NULL DEFAULT (0),
	FirebaseUserId VARCHAR(55),
);
GO

ALTER TABLE [CartDisc] ADD FOREIGN KEY ([CartId]) REFERENCES [Cart] ([Id])
GO
ALTER TABLE [CartDisc] ADD FOREIGN KEY ([DiscId]) REFERENCES [Disc] ([Id])
GO
ALTER TABLE [CartDisc] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO
ALTER TABLE [Cart] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO
ALTER TABLE [Payment] ADD FOREIGN KEY ([OrderId]) REFERENCES [Orders] ([Id])
GO
ALTER TABLE [Payment] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO
ALTER TABLE [Disc] ADD FOREIGN KEY ([BrandId]) REFERENCES [Brand] ([Id])
GO
ALTER TABLE [DiscTag] ADD FOREIGN KEY ([DiscId]) REFERENCES [Disc] ([Id])
GO
ALTER TABLE [DiscTag] ADD FOREIGN KEY ([TagId]) REFERENCES [Tag] ([Id]) ON DELETE CASCADE
GO
ALTER TABLE [Orders] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO
ALTER TABLE [Orders] ADD FOREIGN KEY ([CartId]) REFERENCES [Cart] ([Id])
GO





INSERT INTO [UserProfile] ([Name], Email, IsAdmin, FirebaseUserId) VALUES ('Nathan Traczewski', 'nayhee@gmail.com', 1, 'bgQNZEwhjRhogCWyfKFQpE5ggLC3');
INSERT INTO [UserProfile] ([Name], Email, IsAdmin, FirebaseUserId) VALUES ('Ryan Bogle', 'bogle@gmail.com', 2, 'WoY1QQlpNhPpZ9UaFsuXTTlPoUz2');
INSERT INTO [UserProfile] ([Name], Email, IsAdmin, FirebaseUserId) VALUES ('Palmer Adams', 'palmer@gmail.com', 2, 'Jq0qBW0yJTYCzqKrSIn1UoODTly2');


INSERT INTO [Brand] ([Name]) VALUES ('Innova');
INSERT INTO [Brand] ([Name]) VALUES ('Discmania');
INSERT INTO [Brand] ([Name]) VALUES ('Prodigy');
INSERT INTO [Brand] ([Name]) VALUES ('Discraft');
INSERT INTO [Brand] ([Name]) VALUES ('MVP');
INSERT INTO [Brand] ([Name]) VALUES ('Westside');

INSERT INTO [Tag] ([Name]) VALUES ('Putter');
INSERT INTO [Tag] ([Name]) VALUES ('Mid-Range');
INSERT INTO [Tag] ([Name]) VALUES ('Fairway Driver');
INSERT INTO [Tag] ([Name]) VALUES ('Distance Driver');
INSERT INTO [Tag] ([Name]) VALUES ('Overstable');
INSERT INTO [Tag] ([Name]) VALUES ('Understable');
INSERT INTO [Tag] ([Name]) VALUES ('Stable');

INSERT INTO [Disc] ([Name], BrandId, Condition, Speed, Glide, Turn, Fade, Plastic, Price, Weight, ImageUrl, ForSale, Description) VALUES ('Pig', 1, 'New', 4, 1, 0, 3, 'Champion', 25, 173, 'pig1.jpg', 1, 'The Pig is an overstable Putt & Approach disc. It is great for hyzer putting, sidearm approaches and backhand spikes. The Pig holds the line well, even in extreme wind conditions. The Pig features a Thumtrac® Rim for sure grips on sidearm throws and putts. It performs equally well for backhand or sidearm throws.');   
INSERT INTO [Disc] ([Name], BrandId, Condition, Speed, Glide, Turn, Fade, Plastic, Price, Weight, ImageUrl, ForSale, Description) VALUES ('Teebird3', 1, 'New', 8, 4, 0, 2, 'Champion', 25, 173, 'teebird1.jpg', 1,'The TeeBird3 represents the evolution of the TeeBird. Many people have described a lot of discs as a \"faster TeeBird\", but this is the real deal. The flat flight plate promotes speed while reducing glide, effectively producing consistent, accurate flights. This is a point and shoot, target specific fairway driver.' );   
INSERT INTO [Disc] ([Name], BrandId, Condition, Speed, Glide, Turn, Fade, Plastic, Price, Weight, ImageUrl, ForSale, Description) VALUES ('Shryke', 1, 'New', 13, 6, -2, 2, 'Star', 20, 173, 'shryke1.jpg', 1, 'The Shryke is an easy to throw, very long range driver for a wide variety of players. A mild high speed turn puts the Shryke in glide mode, which along with its high aerodynamic speed, give it incredible distance. The low speed fade is also mild, which makes it easy to keep on the fairway.');   

INSERT INTO [DiscTag] (DiscId, TagId) VALUES (1, 1);
INSERT INTO [DiscTag] (DiscId, TagId) VALUES (1, 5);
INSERT INTO [DiscTag] (DiscId, TagId) VALUES (2, 3);
INSERT INTO [DiscTag] (DiscId, TagId) VALUES (2, 7);
INSERT INTO [DiscTag] (DiscId, TagId) VALUES (3, 4);
INSERT INTO [DiscTag] (DiscId, TagId) VALUES (3, 6);

