const DateTime = Jymfony.Component.DateTime.DateTime;
const FileNotFoundException = Jymfony.Component.HttpFoundation.File.Exception.FileNotFoundException;

const fs = require('fs');
const path = require('path');

/**
 * @memberOf Jymfony.Component.HttpFoundation.File
 */
class File {
    /**
     * Constructor.
     *
     * @param {string} path
     * @param {boolean} checkPath
     */
    __construct(path, checkPath = true) {
        this._fileName = path;
        this._stat = undefined;

        if (checkPath && ! this.exists()) {
            throw new FileNotFoundException(path);
        }
    }

    /**
     * Gets the filename.
     *
     * @returns {string}
     */
    get fileName() {
        return path.basename(this._fileName);
    }

    /**
     * Gets the file size in bytes.
     *
     * @returns {int}
     */
    get size() {
        if (undefined === this._stat && ! this.exists()) {
            return false;
        }

        return this._stat.size;
    }

    /**
     * Tells if a file exists.
     *
     * @returns {boolean}
     */
    exists() {
        try {
            this._stat = fs.statSync(this._fileName);
        } catch (e) {
            return false;
        }

        return true;
    }

    /**
     * Tells if file is readable
     *
     * @returns {boolean}
     */
    get isReadable() {
        try {
            fs.accessSync(this._fileName, fs.constants.R_OK);
        } catch (e) {
            return false;
        }

        return true;
    }

    /**
     * Gets the file content.
     *
     * @returns {Stream.Readable}
     */
    get content() {
        return fs.createReadStream(this._fileName);
    }

    /**
     * Gets the last modification time.
     *
     * @returns {Jymfony.Component.DateTime.DateTime}
     */
    get modificationTime() {
        if (undefined === this._stat && ! this.exists()) {
            throw new FileNotFoundException(this._fileName);
        }

        return new DateTime(this._stat.mtime);
    }
}

module.exports = File;
