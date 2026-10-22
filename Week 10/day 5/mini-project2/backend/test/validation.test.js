const { test } = require('node:test')
const assert = require('node:assert/strict')
const { parseId, validateCredentials } = require('../src/helpers/validation')

test('registration validation requires valid credentials', () => {
  assert.equal(validateCredentials({
    username: 'Reader',
    email: 'reader@example.com',
    password: 'long-password',
  }, true), null)
  assert.match(validateCredentials({ username: 'ab', email: 'bad', password: 'short' }, true), /Username/)
  assert.match(validateCredentials({
    username: 'Reader',
    email: 'bad',
    password: 'long-password',
  }, true), /email/)
})

test('IDs accept positive safe integers only', () => {
  assert.equal(parseId('42'), 42)
  assert.equal(parseId('0'), null)
  assert.equal(parseId('1.5'), null)
  assert.equal(parseId('9007199254740992'), null)
})
