-- Insert Tony Stark Record in 'account'
INSERT INTO account (
	account_firstname,
	account_lastname,
	account_email,
	account_password
) VALUES (
	'Tony',
	'Stark',
	'tony@starknet.com',
	'Iam1ronM@n'
)

-- Update Tony Stark account type --
UPDATE account
SET account_type = 'Admin'
WHERE account_id = 1;

-- Delete Tony Stark record --
DELETE FROM account 
WHERE account_id = 1;

-- Update / Replace text for GM Hummer --
UPDATE inventory
SET inv_description = REPLACE(inv_description, 
							 'the small interiors', -- added "the" since it would have read "gives you the a huge interior" --
							 'a huge interior')
WHERE inv_id = 10;

-- Inner Join inventory / classification --
SELECT inv_make, inv_model, cla.classification_name
FROM inventory inv
LEFT JOIN classification cla
    ON inv.classification_id = cla.classification_id
WHERE cla.classification_name = 'Sport';

-- Update / Replace file path for images & thumbnails --
UPDATE inventory
SET inv_image = REPLACE(inv_image,
						'images/',
						'images/vehicles/'),
inv_thumbnail = REPLACE(inv_thumbnail,
						'images/',
						'images/vehicles/'); 
