"use strict";

export default class DatabaseClient {
	constructor(url) {
		this._url = url;
	}

	save(collection, query, values) {
        throw new TypeError('You must override save.');
    }

    delete(collection) {
        throw new TypeError('You must override delete.');
    }

    deleteOne(collection, query) {
        throw new TypeError('You must override deleteOne.');
    }

    deleteMany(collection, query) {
        throw new TypeError('You must override deleteMany.');
    }

    loadOne(collection, query) {
        throw new TypeError('You must override loadOne.');
    }

    loadOneAndUpdate(collection, query, values, options) {
        throw new TypeError('You must override loadOneAndUpdate.');
    }

    loadOneAndDelete(collection, query, options) {
        throw new TypeError('You must override loadOneAndDelete.');
    }

    loadMany(collection, query) {
        throw new TypeError('You must override loadMany.');
    }

    count(collection, query) {
        throw new TypeError('You must override count.');
    }

    createIndex(collection, field, options) {
        throw new TypeError('You must override createIndex.');
    }

    static connect(url, options) {
		throw new TypeError('You must override connect (static).');
	}

	close() {
		throw new TypeError('You must override close.');
	}

    clearCollection(collection) {
        throw new TypeError('You must override clearCollection.');
    }

    dropDatabase() {
        throw new TypeError('You must override dropDatabase.');
    }

    toCanonicalId(id) {
        throw new TypeError('You must override toCanonicalId.');
    }

    isNativeId(value) {
        throw new TypeError('You must override isNativeId.');
    }

    nativeIdType() {
        throw new TypeError('You must override nativeIdType.');
    }

    toNativeId(id) {
        return this.nativeIdType();
    }


    driver() {
        throw new TypeError('You must override driver.');
    }
}
