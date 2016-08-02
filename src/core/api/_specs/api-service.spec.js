import { API_BASE_URL, CLIENT_ID_PARAM, PAGINATION_PARAMS } from 'src/core/constants';
import { api, dispatch, requestUrl } from '../api-service';


describe('api', () => {
  describe('service', () => {
    let body;
    let server;
    let successResponse;


    beforeEach(() => {
      body = {};
      server = sinon.fakeServer.create();
      successResponse = [200, {'Content-type': 'application/json'}, JSON.stringify(body)];
    });


    afterEach(() => {
      server.restore();
    });


    describe('requestUrl()', () => {
      it('should add client id param to url', () => {
        let url = requestUrl({url: API_BASE_URL});
        expect(url).toMatch(CLIENT_ID_PARAM);
      });

      it('should NOT add duplicate client id param to url', () => {
        let regExp = new RegExp(CLIENT_ID_PARAM, 'gi');
        let url = requestUrl({url: `${API_BASE_URL}?${CLIENT_ID_PARAM}`});
        expect(url.match(regExp).length).toBe(1);
      });

      it('should add pagination params to url if options.paginate is true', () => {
        let url = requestUrl({paginate: true, url: API_BASE_URL});
        expect(url).toMatch(PAGINATION_PARAMS);
      });

      it('should NOT add pagination params to url by default', () => {
        let url = requestUrl({url: API_BASE_URL});
        expect(url).not.toMatch(PAGINATION_PARAMS);
      });
    });


    describe('dispatch()', () => {
      const url = `${API_BASE_URL}?${CLIENT_ID_PARAM}`;

      it('should set request header `Accept: application/json`', () => {
        server.respondWith('get', url, ({requestHeaders}) => {
          expect(requestHeaders.Accept).toBe('application/json');
          return successResponse;
        });

        dispatch({url: API_BASE_URL});
        server.respond();
      });

      it('should resolve promise with response body', done => {
        server.respondWith('get', url, successResponse);

        dispatch({url: API_BASE_URL})
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

      it('should reject promise for soundcloud error codes', () => {
        [400, 401, 403, 404, 406, 422, 429, 500, 503, 504]
          .forEach(code => {
            server.respondWith([code, {}, JSON.stringify({})]);

            dispatch({url: API_BASE_URL})
              .catch(error => {
                expect(error.status).toBe(code);
              });

            server.respond();
          });
      });
    });


    describe('api.fetch()', () => {
      it('should perform GET request with correct url', () => {
        const url = `${API_BASE_URL}?${CLIENT_ID_PARAM}`;

        server.respondWith('get', url, request => {
          expect(request.url).toBe(url);
          return successResponse;
        });

        api.fetch(url);
        server.respond();
      });
    });
  });
});
