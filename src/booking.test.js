import test from 'node:test';
import assert from 'node:assert/strict';
import { validateBooking } from './booking.js';

const valid = { service: 'kacak', name: 'Örnek Kullanıcı', phone: '0532 123 45 67', district: 'Kadıköy', date: '2026-11-03', time: '09:00–12:00', consent: 'on' };
test('valid Turkish booking is accepted', () => assert.deepEqual(validateBooking(valid, '2026-11-02'), []));
test('past date is rejected', () => assert.match(validateBooking({ ...valid, date: '2026-11-01' }, '2026-11-02').join(), /tarih/));
test('invalid phone is rejected', () => assert.match(validateBooking({ ...valid, phone: '123' }, '2026-11-02').join(), /telefonu/));
test('unknown service is rejected', () => assert.match(validateBooking({ ...valid, service: 'invalid' }, '2026-11-02').join(), /hizmet/));
test('consent is required', () => assert.match(validateBooking({ ...valid, consent: '' }, '2026-11-02').join(), /onaylayın/));
test('international Turkish mobile format is accepted', () => assert.deepEqual(validateBooking({ ...valid, phone: '+90 (532) 123-45-67' }, '2026-11-02'), []));
