import { API_TRACKS_URL, API_USERS_URL, CLIENT_ID_PARAM, PAGINATION_PARAMS } from 'src/core/constants';
import { api, dispatch, requestUrl } from '../api-service';


describe('api', () => {
  describe('service', () => {
    let body;
    let queryKey;
    let queryValue;
    let queryParam;
    let server;
    let successResponse;


    beforeEach(() => {
      body = {};
      queryKey = 'q';
      queryValue = 'test';
      queryParam = `${queryKey}=${queryValue}`;
      // server = sinon.fakeServer.create();
      // successResponse = [200, {'Content-type': 'application/json'}, JSON.stringify(body)];
    });


    //afterEach(() => {
      // server.restore();
    //});


    describe('requestUrl()', () => {
      it('should add client id param to url', () => {
        let url = requestUrl({url: API_TRACKS_URL});
        expect(url).toMatch(CLIENT_ID_PARAM);
      });

      it('should NOT add duplicate client id param to url', () => {
        let regExp = new RegExp(CLIENT_ID_PARAM, 'gi');
        let url = requestUrl({url: `${API_TRACKS_URL}?${CLIENT_ID_PARAM}`});
        expect(url.match(regExp).length).toBe(1);
      });

      it('should add pagination params to url if options.paginate is true', () => {
        let url = requestUrl({paginate: true, url: API_TRACKS_URL});
        expect(url).toMatch(PAGINATION_PARAMS);
      });

      it('should NOT add pagination params to url by default', () => {
        let url = requestUrl({url: API_TRACKS_URL});
        expect(url).not.toMatch(PAGINATION_PARAMS);
      });

      it('should add query params to url if options.query is provided', () => {
        let url = requestUrl({query: queryParam, url: API_TRACKS_URL});
        expect(url).toMatch(queryParam);
      });
    });


    describe('dispatch()', () => {
      const url = `${API_TRACKS_URL}?${CLIENT_ID_PARAM}`;

      xit('should set request header `Accept: application/json`', () => {
        server.respondWith('get', url, ({requestHeaders}) => {
          expect(requestHeaders.Accept).toBe('application/json');
          return successResponse;
        });

        dispatch({url: API_TRACKS_URL});
        server.respond();
      });

      xit('should resolve promise with response body', done => {
        server.respondWith('get', url, successResponse);

        dispatch({url: API_TRACKS_URL})
          .then(responseBody => {
            expect(responseBody).toEqual(body);
            done();
          })
          .catch(error => {
            fail(error);
            done();
          });

        server.respond();
      });

      xit('should reject promise for soundcloud error codes', () => {
        [400, 401, 403, 404, 406, 422, 429, 500, 503, 504]
          .forEach(code => {
            server.respondWith([code, {}, JSON.stringify({})]);

            dispatch({url: API_TRACKS_URL})
              .catch(error => {
                expect(error.status).toBe(code);
              });

            server.respond();
          });
      });
    });


    describe('api.fetch()', () => {
      xit('should perform GET request with correct url', () => {
        const url = `${API_TRACKS_URL}?${CLIENT_ID_PARAM}`;

        server.respondWith('get', url, request => {
          expect(request.url).toBe(url);
          return successResponse;
        });

        api.fetch(url);
        server.respond();
      });
    });


    describe('api.fetchSearchResults()', () => {
      xit('should perform GET request with correct url', () => {
        const url = `${API_TRACKS_URL}?${CLIENT_ID_PARAM}&${PAGINATION_PARAMS}&${queryParam}`;

        server.respondWith('get', url, request => {
          expect(request.url).toBe(url);
          return successResponse;
        });

        api.fetchSearchResults(queryValue);
        server.respond();
      });
    });


    describe('api.fetchUser()', () => {
      xit('should perform GET request with correct url', () => {
        const userId = 123;
        const url = `${API_USERS_URL}/${userId}?${CLIENT_ID_PARAM}`;

        server.respondWith('get', url, request => {
          expect(request.url).toBe(url);
          return successResponse;
        });

        api.fetchUser(userId);
        server.respond();
      });
    });


    describe('api.fetchUserLikes()', () => {
      xit('should perform GET request with correct url', () => {
        const userId = 123;
        const url = `${API_USERS_URL}/${userId}/favorites?${CLIENT_ID_PARAM}&${PAGINATION_PARAMS}`;

        server.respondWith('get', url, request => {
          expect(request.url).toBe(url);
          return successResponse;
        });

        api.fetchUserLikes(userId);
        server.respond();
      });
    });


    describe('api.fetchUserTracks()', () => {
      xit('should perform GET request with correct url', () => {
        const userId = 123;
        const url = `${API_USERS_URL}/${userId}/tracks?${CLIENT_ID_PARAM}&${PAGINATION_PARAMS}`;

        server.respondWith('get', url, request => {
          expect(request.url).toBe(url);
          return successResponse;
        });

        api.fetchUserTracks(userId);
        server.respond();
      });
    });
  });
});
