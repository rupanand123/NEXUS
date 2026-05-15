# Security Specification - Nexus IT Solutions

## Data Invariants
1. `Inquiry` must have a valid `name`, `email`, `service`, and `message`.
2. `Inquiry` must have a `status` which defaults to 'new' and can only be updated by admins.
3. `Inquiry` `createdAt` must be a server timestamp.
4. Users can only create inquiries; they cannot read, update, or delete them (only admins can).

## The Dirty Dozen Payloads
1. **Unauthenticated Read**: Attempt to list inquiries without a user.
2. **Anonymous Create**: Attempt to create an inquiry with missing fields.
3. **Identity Spoofing**: Attempt to set a custom ID that is too long or has bad characters.
4. **Status Hijack**: Attempt to create an inquiry with status 'resolved'.
5. **Admin Access Bypass**: Attempt to read inquiries as a non-admin user.
6. **Malicious Payload**: Injecting a 1MB string into the message field.
7. **Future Dating**: Sending a `createdAt` value that is not the server time.
8. **Shadow Update**: Attempting to update an existing inquiry as a public user.
9. **Field Poisoning**: Adding a 'role: admin' field to the inquiry.
10. **Query Scrape**: Attempting to list all inquiries with a blanket query.
11. **ID Poisoning**: Using a path variable like `/inquiries/some-very-long-junk-key`.
12. **Status Escalation**: Attempting to update status from 'new' to 'resolved' as a regular user.

## FireStore Rules
Drafting rules in `firestore.rules`.
