import React, { useState } from 'react';
import { Storage, LogLevel, FileStatus } from '@apillon/sdk';

const storage = new Storage({
    key: 'c02a738b-ffb0-40a3-8175-e9366a57c785',
    secret: 'kDglLAm#%Z!G',
    logLevel: LogLevel.NONE,
});

const Form = () => {
    const [name, setName] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();
        // convert the data to JSON
        const data = JSON.stringify({ name });
        // create and instance of a bucket directly through uuid
        const bucket = storage.bucket('58b2b450-af93-4cc2-bf6c-88efd2a91ba8');
        // Upload data as a file
        await bucket.uploadFiles(
          [
            {
              fileName: 'data.json',
              contentType: 'application/json',
              content: Buffer.from(data),
            },
          ],
          { wrapWithDirectory: true, directoryPath: 'main/documents' }
        );
      };

    const handleInputChange = event => {
        setName(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={name} onChange={handleInputChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
};

export default Form;