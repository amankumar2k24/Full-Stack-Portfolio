const bcrypt = require('bcrypt');

async function testPassword() {
    const plainPassword = 'Aman@123';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    console.log('Plain password:', plainPassword);
    console.log('Hashed password:', hashedPassword);

    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    console.log('Password match:', isMatch);

    // Test with the exact same logic as in the auth service
    const testHash = '$2b$10$someHashHere'; // This would be from database
    console.log('Testing bcrypt compare function...');
}

testPassword();