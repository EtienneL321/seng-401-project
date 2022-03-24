-- Insert rows into table 'dbo.staff'
INSERT INTO dbo.staff
( -- columns to insert data into
 [idStaff], [username], [password], [name], [address], [contactNum], [staffType], [clearanceLevel], [pharmName]
)
VALUES
( -- first row: values for the columns in the list above
 1001,"jdoe", "12345", "John Doe", "403-555 2212", "123 maple st SW", "587-999 0202, D, 4, none"
),
( -- second row: values for the columns in the list above
  1001,"mjane", "abcde", "Mary Jane", "403-555 2212", "123 oak st SW", "587-999 0202, N, 2, none"
),
( -- second row: values for the columns in the list above
  1001,"jdoe", "098765", "John Doe", "403-555 2212", "123 birch st SW", "587-999 0202, D, 3, none"
),
( -- second row: values for the columns in the list above
  1001,"admin", "asceplius", "Mike ", "403-555 2212", "123 starwars st SW", "587-999 0202, A, 5, none"
)
GO