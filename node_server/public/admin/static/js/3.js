((typeof self !== 'undefined' ? self : this)["webpackJsonp"] = (typeof self !== 'undefined' ? self : this)["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/room/index.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/room/index.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($, jQuery) {/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.array.find */ "./node_modules/core-js/modules/es6.array.find.js");
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var D_box_vue_admin_node_modules_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var D_box_vue_admin_node_modules_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var D_box_vue_admin_node_modules_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es7.array.includes */ "./node_modules/core-js/modules/es7.array.includes.js");
/* harmony import */ var core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es6_string_includes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es6.string.includes */ "./node_modules/core-js/modules/es6.string.includes.js");
/* harmony import */ var core_js_modules_es6_string_includes__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_includes__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _views_room_roomText_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/views/room/roomText.vue */ "./src/views/room/roomText.vue");
/* harmony import */ var _components_Tinymce_index_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/components/Tinymce/index.vue */ "./src/components/Tinymce/index.vue");







//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'room',
  components: {
    RoomText: _views_room_roomText_vue__WEBPACK_IMPORTED_MODULE_7__["default"],
    Tinymce: _components_Tinymce_index_vue__WEBPACK_IMPORTED_MODULE_8__["default"]
  },
  data: function data() {
    return {
      room: '',
      textarea: '',
      videoArr: [],
      video: '',
      audioArr: [],
      audio: ''
    };
  },
  methods: {
    /**
     * 问题点 没有切换摄像头和音频的处理
     * */
    initWebRtc: function initWebRtc(room) {
      var _this = this;

      _this.room = room;

      function addView(id) {
        if (!$('#' + id)[0]) {
          $('<div/>', {
            id: id,
            class: 'video-view'
          }).appendTo('#video_grid');
        }
      }

      function removeView(id) {
        if ($('#' + id)[0]) {
          $('#' + id).remove();
        }
      } // populate camera options


      TRTC.getCameras().then(function (devices) {
        _this.videoArr = devices;
        _this.video = devices[0].deviceId;
      }); // populate microphone options

      TRTC.getMicrophones().then(function (devices) {
        _this.audioArr = devices;
        _this.audio = devices[0].deviceId;
      }); // fix jquery touchstart event warn in chrome M76

      jQuery.event.special.touchstart = {
        setup: function setup(_, ns, handle) {
          if (ns.includes('noPreventDefault')) {
            this.addEventListener('touchstart', handle, {
              passive: false
            });
          } else {
            this.addEventListener('touchstart', handle, {
              passive: true
            });
          }
        }
      };
      jQuery.event.special.touchmove = {
        setup: function setup(_, ns, handle) {
          if (ns.includes('noPreventDefault')) {
            this.addEventListener('touchmove', handle, {
              passive: false
            });
          } else {
            this.addEventListener('touchmove', handle, {
              passive: true
            });
          }
        }
      };
      var Toast = {
        info: function info(msg) {
          _this.$notify({
            title: '提示',
            message: msg,
            type: 'info'
          });
        },
        notify: function notify(msg) {
          _this.$notify({
            title: '成功',
            message: msg,
            type: 'success'
          });
        },
        error: function error(msg) {
          _this.$notify({
            title: '失败',
            message: msg,
            type: 'error'
          });
        }
        /* eslint-disable require-jsdoc */

      };

      var RtcClient =
      /*#__PURE__*/
      function () {
        function RtcClient(options) {
          Object(D_box_vue_admin_node_modules_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, RtcClient);

          this.sdkAppId_ = options.sdkAppId;
          this.userId_ = options.userId;
          this.userSig_ = options.userSig;
          this.roomId_ = options.roomId;
          this.isJoined_ = false;
          this.isPublished_ = false;
          this.localStream_ = null;
          this.remoteStreams_ = []; // check if browser is compatible with TRTC

          TRTC.checkSystemRequirements().then(function (result) {
            if (!result) {
              alert('Your browser is not compatible with TRTC! Please download Chrome M72+');
            }
          });
        }

        Object(D_box_vue_admin_node_modules_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(RtcClient, [{
          key: "join",
          value: function () {
            var _join = Object(D_box_vue_admin_node_modules_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (!this.isJoined_) {
                        _context.next = 3;
                        break;
                      }

                      console.warn('duplicate RtcClient.join() observed');
                      return _context.abrupt("return");

                    case 3:
                      // create a client for RtcClient
                      this.client_ = TRTC.createClient({
                        mode: 'videoCall',
                        // 实时通话模式
                        sdkAppId: this.sdkAppId_,
                        userId: this.userId_,
                        userSig: this.userSig_
                      }); // 处理 client 事件

                      this.handleEvents();
                      _context.prev = 5;
                      _context.next = 8;
                      return this.client_.join({
                        roomId: this.roomId_
                      });

                    case 8:
                      console.log('join room success');
                      Toast.notify('进房成功！');
                      this.isJoined_ = true;
                      _context.next = 19;
                      break;

                    case 13:
                      _context.prev = 13;
                      _context.t0 = _context["catch"](5);
                      console.error('failed to join room because: ' + _context.t0);
                      alert('进房失败原因：' + _context.t0 + '\r\n\r\n请确保您的网络连接是正常的，您可以先体验一下我们的Demo以确保网络连接是正常的：' + '\r\n https://trtc-1252463788.file.myqcloud.com/web/demo/official-demo/index.html ' + '\r\n\r\n另外，请确保您的账号信息是正确的。' + '\r\n请打开链接：https://cloud.tencent.com/document/product/647/34342 查询详细错误信息！');
                      Toast.error('进房错误！');
                      return _context.abrupt("return");

                    case 19:
                      _context.prev = 19;
                      _context.next = 22;
                      return this.createLocalStream({
                        audio: true,
                        video: true
                      });

                    case 22:
                      Toast.info('摄像头及麦克风采集成功！');
                      console.log('createLocalStream with audio/video success');
                      _context.next = 40;
                      break;

                    case 26:
                      _context.prev = 26;
                      _context.t1 = _context["catch"](19);
                      console.error('createLocalStream with audio/video failed: ' + _context.t1);
                      alert('请确认已连接摄像头和麦克风并授予其访问权限！\r\n\r\n 如果您没有连接摄像头或麦克风，您可以通过调整第60行代码来关闭未连接设备的采集请求！');
                      _context.prev = 30;
                      _context.next = 33;
                      return this.createLocalStream({
                        audio: false,
                        video: true
                      });

                    case 33:
                      Toast.info('采集摄像头成功！');
                      _context.next = 40;
                      break;

                    case 36:
                      _context.prev = 36;
                      _context.t2 = _context["catch"](30);
                      console.error('createLocalStream with video failed: ' + _context.t2);
                      return _context.abrupt("return");

                    case 40:
                      this.localStream_.on('player-state-changed', function (event) {
                        console.log("local stream ".concat(event.type, " player is ").concat(event.state));

                        if (event.type === 'video' && event.state === 'PLAYING') {// dismiss the remote user UI placeholder
                        } else if (event.type === 'video' && event.state === 'STOPPPED') {// show the remote user UI placeholder
                        }
                      }); // 在名为 ‘local_stream’ 的 div 容器上播放本地音视频

                      this.localStream_.play('local_stream'); // publish local stream by default after join the room

                      _context.next = 44;
                      return this.publish();

                    case 44:
                      Toast.notify('发布本地流成功！');

                    case 45:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this, [[5, 13], [19, 26], [30, 36]]);
            }));

            function join() {
              return _join.apply(this, arguments);
            }

            return join;
          }()
        }, {
          key: "leave",
          value: function () {
            var _leave = Object(D_box_vue_admin_node_modules_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee2() {
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (this.isJoined_) {
                        _context2.next = 4;
                        break;
                      }

                      console.warn('leave() - leave without join()d observed');
                      Toast.error('请先加入房间！');
                      return _context2.abrupt("return");

                    case 4:
                      if (!this.isPublished_) {
                        _context2.next = 7;
                        break;
                      }

                      _context2.next = 7;
                      return this.unpublish(true);

                    case 7:
                      _context2.prev = 7;
                      _context2.next = 10;
                      return this.client_.leave();

                    case 10:
                      Toast.notify('退房成功！');
                      this.isJoined_ = false;
                      _context2.next = 18;
                      break;

                    case 14:
                      _context2.prev = 14;
                      _context2.t0 = _context2["catch"](7);
                      console.error('failed to leave the room because ' + _context2.t0);
                      location.reload();

                    case 18:
                      _context2.prev = 18;
                      // 停止本地流，关闭本地流内部的音视频播放器
                      this.localStream_.stop(); // 关闭本地流，释放摄像头和麦克风访问权限

                      this.localStream_.close();
                      this.localStream_ = null;
                      return _context2.finish(18);

                    case 23:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this, [[7, 14, 18, 23]]);
            }));

            function leave() {
              return _leave.apply(this, arguments);
            }

            return leave;
          }()
        }, {
          key: "publish",
          value: function () {
            var _publish = Object(D_box_vue_admin_node_modules_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee3() {
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      if (this.isJoined_) {
                        _context3.next = 4;
                        break;
                      }

                      Toast.error('请先加入房间再点击开始推流！');
                      console.warn('publish() - please join() firstly');
                      return _context3.abrupt("return");

                    case 4:
                      if (!this.isPublished_) {
                        _context3.next = 8;
                        break;
                      }

                      console.warn('duplicate RtcClient.publish() observed');
                      Toast.error('当前正在推流！');
                      return _context3.abrupt("return");

                    case 8:
                      _context3.prev = 8;
                      _context3.next = 11;
                      return this.client_.publish(this.localStream_);

                    case 11:
                      Toast.info('发布本地流成功！');
                      this.isPublished_ = true;
                      _context3.next = 20;
                      break;

                    case 15:
                      _context3.prev = 15;
                      _context3.t0 = _context3["catch"](8);
                      console.error('failed to publish local stream ' + _context3.t0);
                      Toast.error('发布本地流失败！');
                      this.isPublished_ = false;

                    case 20:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this, [[8, 15]]);
            }));

            function publish() {
              return _publish.apply(this, arguments);
            }

            return publish;
          }()
        }, {
          key: "unpublish",
          value: function () {
            var _unpublish = Object(D_box_vue_admin_node_modules_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee4(isLeaving) {
              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      if (this.isJoined_) {
                        _context4.next = 4;
                        break;
                      }

                      console.warn('unpublish() - please join() firstly');
                      Toast.error('请先加入房间再停止推流！');
                      return _context4.abrupt("return");

                    case 4:
                      if (this.isPublished_) {
                        _context4.next = 8;
                        break;
                      }

                      console.warn('RtcClient.unpublish() called but not published yet');
                      Toast.error('当前尚未发布本地流！');
                      return _context4.abrupt("return");

                    case 8:
                      _context4.prev = 8;
                      _context4.next = 11;
                      return this.client_.unpublish(this.localStream_);

                    case 11:
                      this.isPublished_ = false;
                      Toast.info('停止发布本地流成功！');
                      _context4.next = 20;
                      break;

                    case 15:
                      _context4.prev = 15;
                      _context4.t0 = _context4["catch"](8);
                      console.error('failed to unpublish local stream because ' + _context4.t0);
                      Toast.error('停止发布本地流失败！');

                      if (!isLeaving) {
                        console.warn('leaving the room because unpublish failure observed');
                        Toast.error('停止发布本地流失败，退出房间！');
                        this.leave();
                      }

                    case 20:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4, this, [[8, 15]]);
            }));

            function unpublish(_x) {
              return _unpublish.apply(this, arguments);
            }

            return unpublish;
          }()
        }, {
          key: "createLocalStream",
          value: function () {
            var _createLocalStream = Object(D_box_vue_admin_node_modules_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee5(options) {
              return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      this.localStream_ = TRTC.createStream({
                        audio: options.audio,
                        // 采集麦克风
                        video: options.video,
                        // 采集摄像头
                        userId: this.userId_,
                        cameraId: _this.video,
                        microphoneId: _this.audio
                      }); // 设置视频分辨率帧率和码率

                      this.localStream_.setVideoProfile('480p');
                      _context5.next = 4;
                      return this.localStream_.initialize();

                    case 4:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5, this);
            }));

            function createLocalStream(_x2) {
              return _createLocalStream.apply(this, arguments);
            }

            return createLocalStream;
          }()
        }, {
          key: "handleEvents",
          value: function handleEvents() {
            var _this2 = this;

            // 处理 client 错误事件，错误均为不可恢复错误，建议提示用户后刷新页面
            this.client_.on('error', function (err) {
              console.error(err);
              alert(err);
              Toast.error('客户端错误：' + err); // location.reload();
            }); // 处理用户被踢事件，通常是因为房间内有同名用户引起，这种问题一般是应用层逻辑错误引起的
            // 应用层请尽量使用不同用户ID进房

            this.client_.on('client-banned', function (err) {
              console.error('client has been banned for ' + err);
              Toast.error('用户被踢出房间！'); // location.reload();
            }); // 远端用户进房通知 - 仅限主动推流用户

            this.client_.on('peer-join', function (evt) {
              var userId = evt.userId;
              console.log('peer-join ' + userId);
              Toast.notify('远端用户进房 - ' + userId);
            }); // 远端用户退房通知 - 仅限主动推流用户

            this.client_.on('peer-leave', function (evt) {
              var userId = evt.userId;
              console.log('peer-leave ' + userId);
              Toast.notify('远端用户退房 - ' + userId);
            }); // 处理远端流增加事件

            this.client_.on('stream-added', function (evt) {
              var remoteStream = evt.stream;
              var id = remoteStream.getId();
              var userId = remoteStream.getUserId();
              console.log("remote stream added: [".concat(userId, "] ID: ").concat(id, " type: ").concat(remoteStream.getType()));
              Toast.info('远端流增加 - ' + userId);
              console.log('subscribe to this remote stream'); // 远端流默认已订阅所有音视频，此处可指定只订阅音频或者音视频，不能仅订阅视频。
              // 如果不想观看该路远端流，可调用 this.client_.unsubscribe(remoteStream) 取消订阅

              _this2.client_.subscribe(remoteStream);
            }); // 远端流订阅成功事件

            this.client_.on('stream-subscribed', function (evt) {
              var remoteStream = evt.stream;
              var id = remoteStream.getId();

              _this2.remoteStreams_.push(remoteStream);

              addView(id); // 在指定的 div 容器上播放音视频

              remoteStream.play(id);
              var html = "<div class=\"control\">\n                          <i class=\"jingyin el-icon-microphone\"></i>\n                        </div>";
              $(html).appendTo("#".concat(id));
              console.log('stream-subscribed ID: ', id);
              Toast.info('远端流订阅成功 - ' + remoteStream.getUserId());
            }); // 处理远端流被删除事件

            this.client_.on('stream-removed', function (evt) {
              var remoteStream = evt.stream;
              var id = remoteStream.getId(); // 关闭远端流内部的音视频播放器

              remoteStream.stop();
              _this2.remoteStreams_ = _this2.remoteStreams_.filter(function (stream) {
                return stream.getId() !== id;
              });
              removeView(id);
              console.log("stream-removed ID: ".concat(id, "  type: ").concat(remoteStream.getType()));
              Toast.info('远端流删除 - ' + remoteStream.getUserId());
            }); // 处理远端流更新事件，在音视频通话过程中，远端流音频或视频可能会有更新

            this.client_.on('stream-updated', function (evt) {
              var remoteStream = evt.stream;
              console.log('type: ' + remoteStream.getType() + ' stream-updated hasAudio: ' + remoteStream.hasAudio() + ' hasVideo: ' + remoteStream.hasVideo());
              Toast.info('远端流更新！');
            }); // 远端流音频或视频mute状态通知

            this.client_.on('mute-audio', function (evt) {
              console.log(evt.userId + ' mute audio');
            });
            this.client_.on('unmute-audio', function (evt) {
              console.log(evt.userId + ' unmute audio');
            });
            this.client_.on('mute-video', function (evt) {
              console.log(evt.userId + ' mute video');
            });
            this.client_.on('unmute-video', function (evt) {
              console.log(evt.userId + ' unmute video');
            }); // 信令通道连接状态通知

            this.client_.on('connection-state-changed', function (evt) {
              console.log("RtcClient state changed to ".concat(evt.state, " from ").concat(evt.prevState));
            });
          }
        }]);

        return RtcClient;
      }();
      /* eslint-disable require-jsdoc */


      var rtc = null;
      $('#join').on('click', function (e) {
        e.preventDefault();
        console.log('join');
        if (rtc) return;
        var userId = _this.$store.getters.userInfo.id;
        var roomId = _this.room;
        var config = genTestUserSig(userId);
        rtc = new RtcClient({
          userId: userId,
          roomId: roomId,
          sdkAppId: config.sdkAppId,
          userSig: config.userSig
        });
        rtc.join();
      });
      $('#leave').on('click', function (e) {
        e.preventDefault();
        console.log('leave');

        if (!rtc) {
          Toast.error('请先加入房间！');
          return;
        }

        rtc.leave();
        rtc = null;
      });
      $('#video_grid').on('click', '.jingyin', function (e) {
        if ($(this).hasClass('el-icon-microphone')) {
          $(this).removeClass('el-icon-microphone').addClass('el-icon-turn-off-microphone');
          $(this).parents('.video-view').find('audio').attr('muted', true);
        } else {
          $(this).removeClass('el-icon-turn-off-microphone').addClass('el-icon-microphone');
          $(this).parents('.video-view').find('audio').attr('muted', false);
        }
      });
    }
  },
  mounted: function mounted() {
    this.initWebRtc(456);
    this.$refs.roomText.initSocket(456);
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"), __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/room/roomText.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/room/roomText.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.regexp.split */ "./node_modules/core-js/modules/es6.regexp.split.js");
/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_0__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'room-text',
  components: {},
  data: function data() {
    return {
      uploadUrl: this.api.commonURL.uploadUrl,
      room: '',
      socketTask: null,
      drawer: false,
      textarea: '',
      allMessage: [],
      canSend: true,
      unread: 0
    };
  },
  methods: {
    sendMessage: function sendMessage() {
      var _this2 = this;

      if (this.canSend) {
        this.canSend = false;
        this.api.sendMessage({
          code: 1,
          // 普通文本
          text: this.textarea,
          group_id: this.room,
          avatar: this.$store.getters.userInfo.avatar,
          // 当前用户的头像
          user_id: this.$store.getters.userInfo.id,
          // 当前用户的id
          create_time: new Date()
        });
        this.textarea = '';
        setTimeout(function () {
          _this2.canSend = true;
        }, 1000);
      }
    },
    initSocket: function initSocket(room) {
      var _this = this; // 这些代码应该 放到app中的   里面加上初始化和关闭功能


      _this.room = room;

      if (!_this.socketTask) {
        _this.socketTask = new WebSocket('wss://chat.xee.link:8282');
        console.log(_this.socketTask);

        _this.socketTask.onclose = function () {
          _this.socketTask = null;
        };

        _this.socketTask.onmessage = function (message) {
          console.log(message);
          var data = JSON.parse(message.data);
          console.log(data);

          switch (data.type) {
            case 'init':
              _this.socketTask.client_id = data.client_id;
              console.log(_this.socketTask);

              _this.api.bindId({
                client_id: data.client_id,
                user_id: _this.openid,
                group_id: room
              });

              _this.api.loadAll({
                group_id: room
              }).then(function (res) {
                _this.addMessage(res.data, 1);
              });

              break;

            case 'message':
              console.log('来了一条新消息');

              _this.addMessage(data.data);

              break;
          }
        };
      }
    },
    addMessage: function addMessage(message, type) {
      if (type) {
        this.allMessage = message;
      } else {
        this.allMessage.push(message);

        if (!this.drawer) {
          this.unread++;
        }
      }

      if ($('.scroll-view').length) {
        this.$nextTick(function () {
          $('.scroll-view').animate({
            scrollTop: $('.scroll-view')[0].scrollHeight + 1000
          }, 500);
        });
      }

      if (!type && this.$store.getters.userInfo.id !== message.user_id) {
        this.$refs.audio.play();
      }
    },
    // 图片上传成功后的操作
    handleAvatarSuccess: function handleAvatarSuccess(res, file) {
      // 这里加一个后台返回连接的
      // this.dialog.form.avatar = URL.createObjectURL(file.raw)
      console.log(123, res);
      var arr = res.data.path.split('.');
      var lastName = arr[arr.length - 1].toUpperCase();
      var code = '';

      switch (lastName) {
        case 'PNG':
        case 'JPG':
        case 'JPEG':
        case 'WEBP':
        case 'SVG':
          code = 2;
          break;

        case 'PDF':
          code = 3;
          break;

        case 'DOC':
        case 'DOCX':
          code = 4;
          break;

        case 'XLS':
        case 'XLSX':
          code = 5;
          break;

        case 'PPTX':
        case 'PPT':
          code = 6;
          break;

        default:
          code = 99;
          break;
      }

      this.api.sendMessage({
        code: code,
        // 普通文本
        text: res.path,
        group_id: this.room,
        avatar: this.$store.getters.userInfo.avatar,
        // 当前用户的头像
        user_id: this.$store.getters.userInfo.id,
        // 当前用户的id
        file_name: res.data.original_name,
        file_size: sizeFormat(res.data.size),
        create_time: new Date()
      });

      function sizeFormat(size) {
        size = size / 1024;

        if (size) {
          if (size > 102) {
            return (size / 1024).toFixed(2) + 'mb';
          } else {
            return size.toFixed(2) + 'kb';
          }
        } else {
          return '0kb';
        }
      }
    },
    // 图片上传之前的校验
    beforeAvatarUpload: function beforeAvatarUpload(file) {
      var isLt2M = file.size / 1024 / 1024 < 10;

      if (!isLt2M) {
        this.$message.error('小于10MB!');
      }

      return isLt2M;
    },
    openDrawer: function openDrawer() {
      this.drawer = true;
      this.unread = 0;
      this.$nextTick(function () {
        $('.scroll-view').animate({
          scrollTop: $('.scroll-view')[0].scrollHeight + 1000
        }, 500);
      });
    }
  },
  mounted: function mounted() {}
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"e948198a-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/room/index.vue?vue&type=template&id=3af1f590&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"e948198a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/room/index.vue?vue&type=template&id=3af1f590& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "room" },
    [
      _c("room-text", { ref: "roomText" }),
      _c("div", { staticClass: "head" }, [_vm._v("治安调解室")]),
      _c("div", { staticClass: "box" }, [
        _c("div", { staticClass: "left" }, [
          _c(
            "div",
            { staticClass: "head before-head" },
            [
              _c(
                "div",
                { staticStyle: { margin: "10px 0", "text-align": "right" } },
                [
                  _c(
                    "el-button",
                    { attrs: { id: "join", size: "small", type: "primary" } },
                    [_vm._v("加入房间")]
                  ),
                  _c(
                    "el-button",
                    { attrs: { id: "leave", size: "small", type: "danger" } },
                    [_vm._v("离开房间")]
                  )
                ],
                1
              ),
              _c(
                "el-form",
                {
                  ref: "form",
                  attrs: { "label-width": "80px", size: "small" }
                },
                [
                  _c(
                    "el-form-item",
                    {
                      staticStyle: { display: "inline-block" },
                      attrs: { label: "摄像头" }
                    },
                    [
                      _c(
                        "el-select",
                        {
                          model: {
                            value: _vm.video,
                            callback: function($$v) {
                              _vm.video = $$v
                            },
                            expression: "video"
                          }
                        },
                        _vm._l(_vm.videoArr, function(item) {
                          return _c("el-option", {
                            key: item.deviceId,
                            attrs: { label: item.label, value: item.deviceId }
                          })
                        }),
                        1
                      )
                    ],
                    1
                  ),
                  _c(
                    "el-form-item",
                    {
                      staticStyle: { display: "inline-block" },
                      attrs: { label: "麦克风" }
                    },
                    [
                      _c(
                        "el-select",
                        {
                          model: {
                            value: _vm.audio,
                            callback: function($$v) {
                              _vm.audio = $$v
                            },
                            expression: "audio"
                          }
                        },
                        _vm._l(_vm.audioArr, function(item) {
                          return _c("el-option", {
                            key: item.deviceId,
                            attrs: { label: item.label, value: item.deviceId }
                          })
                        }),
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._m(0)
        ]),
        _c("div", { staticClass: "right" }, [
          _c("div", { staticClass: "head" }, [_vm._v("治安调解协议书")]),
          _c(
            "div",
            { staticClass: "textarea" },
            [_c("tinymce", { ref: "tinymce" })],
            1
          ),
          _c(
            "div",
            { staticClass: "foot" },
            [
              _c("el-button", { attrs: { type: "primary", size: "mini" } }, [
                _vm._v("提交协议")
              ])
            ],
            1
          )
        ])
      ])
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "before-head" }, [
      _c("div", { staticClass: "video-grid ", attrs: { id: "video_grid" } }, [
        _c(
          "div",
          {
            staticClass: "video-placeholder video-view",
            attrs: { id: "local_stream" }
          },
          [
            _c("div", {
              staticClass: "video-info",
              attrs: { id: "local_video_info" }
            })
          ]
        )
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"e948198a-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/room/roomText.vue?vue&type=template&id=0210149c&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"e948198a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/room/roomText.vue?vue&type=template&id=0210149c& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "room-text" },
    [
      _c(
        "div",
        { staticClass: "open-message", on: { click: _vm.openDrawer } },
        [
          _c("div", [
            _vm._v("聊天"),
            _vm.unread
              ? _c("span", { staticClass: "unread" }, [
                  _vm._v(_vm._s(_vm.unread))
                ])
              : _vm._e()
          ])
        ]
      ),
      _c(
        "el-drawer",
        {
          attrs: {
            title: "聊天窗口",
            size: "500px",
            visible: _vm.drawer,
            direction: "rtl"
          },
          on: {
            "update:visible": function($event) {
              _vm.drawer = $event
            }
          }
        },
        [
          _c(
            "div",
            { staticClass: "scroll-view" },
            _vm._l(_vm.allMessage, function(item) {
              return _c("div", { key: item.id, staticClass: "content-box" }, [
                _c("div", { staticClass: "center" }, [
                  _vm._v(" " + _vm._s(item.create_time))
                ]),
                item.user_id == _vm.$store.getters.userInfo.id
                  ? _c("div", { staticClass: "right" }, [
                      item.code == 1
                        ? _c("div", { staticClass: "item text" }, [
                            _c("span", [_vm._v(_vm._s(item.text))])
                          ])
                        : item.code == 2
                        ? _c(
                            "div",
                            {
                              staticClass: "item image",
                              attrs: { bindtap: "showBigImage(item)" }
                            },
                            [
                              _c("el-image", {
                                attrs: { src: item.text, fit: "fit" }
                              })
                            ],
                            1
                          )
                        : _c(
                            "a",
                            {
                              staticClass: "item file",
                              attrs: { href: item.text, target: "_blank" }
                            },
                            [
                              _c("div", { staticClass: "file-info" }, [
                                _c("div", { staticClass: "name" }, [
                                  _c("span", [_vm._v(_vm._s(item.file_name))])
                                ]),
                                _c("div", { staticClass: "size" }, [
                                  _c("span", [_vm._v(_vm._s(item.file_size))])
                                ])
                              ]),
                              _c("el-image", {
                                attrs: {
                                  src: "./static/img/" + item.code + "file.png",
                                  fit: "fit"
                                }
                              })
                            ],
                            1
                          ),
                      _c(
                        "div",
                        { staticClass: "avatar" },
                        [
                          _c("el-image", {
                            staticStyle: {
                              width: "38px",
                              height: "38px",
                              "border-radius": "4px"
                            },
                            attrs: { src: item.avatar, fit: "fit" }
                          })
                        ],
                        1
                      )
                    ])
                  : _c("div", { staticClass: "left" }, [
                      _c(
                        "div",
                        { staticClass: "avatar" },
                        [
                          _c("el-image", {
                            staticStyle: {
                              width: "38px",
                              height: "38px",
                              "border-radius": "4px"
                            },
                            attrs: { src: item.avatar, fit: "fit" }
                          })
                        ],
                        1
                      ),
                      item.code == 1
                        ? _c("div", { staticClass: "item text" }, [
                            _c("span", [_vm._v(_vm._s(item.text))])
                          ])
                        : item.code == 2
                        ? _c(
                            "div",
                            {
                              staticClass: "item image",
                              attrs: { bindtap: "showBigImage(item)" }
                            },
                            [
                              _c("el-image", {
                                attrs: { src: item.text, fit: "fit" }
                              })
                            ],
                            1
                          )
                        : _c(
                            "a",
                            {
                              staticClass: "item file",
                              attrs: { href: item.text, target: "_blank" }
                            },
                            [
                              _c("div", { staticClass: "file-info" }, [
                                _c("div", { staticClass: "name" }, [
                                  _c("span", [_vm._v(_vm._s(item.file_name))])
                                ]),
                                _c("div", { staticClass: "size" }, [
                                  _c("span", [_vm._v(_vm._s(item.file_size))])
                                ])
                              ]),
                              _c("el-image", {
                                attrs: {
                                  src: "./static/img/" + item.code + "file.png",
                                  fit: "fit"
                                }
                              })
                            ],
                            1
                          )
                    ])
              ])
            }),
            0
          ),
          _c("div", { staticClass: "send-message" }, [
            _c(
              "div",
              { staticClass: "tool-box" },
              [
                _c(
                  "el-upload",
                  {
                    staticClass: "upload-demo",
                    attrs: {
                      action: _vm.uploadUrl,
                      "show-file-list": false,
                      "on-success": _vm.handleAvatarSuccess,
                      "before-upload": _vm.beforeAvatarUpload
                    }
                  },
                  [_c("i", { staticClass: "el-icon-folder" })]
                )
              ],
              1
            ),
            _c(
              "div",
              { staticClass: "input" },
              [
                _c("el-input", {
                  attrs: { type: "textarea", rows: 4 },
                  nativeOn: {
                    keyup: function($event) {
                      if (
                        !$event.type.indexOf("key") &&
                        _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                      ) {
                        return null
                      }
                      return _vm.sendMessage($event)
                    }
                  },
                  model: {
                    value: _vm.textarea,
                    callback: function($$v) {
                      _vm.textarea = $$v
                    },
                    expression: "textarea"
                  }
                })
              ],
              1
            ),
            _c(
              "div",
              { staticClass: "send" },
              [
                _c(
                  "el-button",
                  { attrs: { size: "mini" }, on: { click: _vm.sendMessage } },
                  [_vm._v("发送")]
                )
              ],
              1
            )
          ])
        ]
      ),
      _c("audio", {
        ref: "audio",
        staticStyle: { visibility: "hidden" },
        attrs: { muted: "", src: "./static/audio/msnaudio.mp3" }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/room/index.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-2!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/room/index.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".room {\n  padding: 0 20px;\n  min-width: 1300px;\n  min-height: 100%;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  background: url(" + escape(__webpack_require__(/*! ./bg.png */ "./src/views/room/bg.png")) + ");\n  background-size: contain;\n}\n.room > .head {\n  height: 65px;\n  line-height: 64px;\n  text-align: center;\n  font-size: 24px;\n}\n.room .box {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: nowrap row;\n          flex-flow: nowrap row;\n}\n.room .box .left {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  width: 600px;\n  margin-right: 24px;\n}\n.room .box .left .before-head {\n  margin-bottom: 16px;\n}\n.room .box .left .before-head:before {\n  content: \" \";\n  width: 100%;\n  height: 8px;\n  background: #396afc;\n  display: block;\n  border-radius: 8px 8px 0 0;\n}\n.room .box .left .video-grid {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.room .box .left #local_stream {\n  position: relative;\n}\n.room .box .left #local_video_info {\n  position: absolute;\n}\n.room .box .left .video-view, .room .box .left #local_stream, .room .box .left #local_video_info {\n  width: 295px;\n  height: 200px;\n  margin-top: 10px;\n}\n.room .box .left .video-view {\n  position: relative;\n}\n.room .box .left .video-view .control {\n  position: absolute;\n  bottom: 10px;\n  right: 10px;\n  z-index: 10000;\n}\n.room .box .left .video-view .control .jingyin {\n  cursor: pointer;\n}\n.room .box .left .video-view .control .jingyin:hover {\n  color: #3A71A8;\n}\n.room .box .right {\n  margin-right: 10px;\n  width: 0;\n  -webkit-box-flex: 1;\n      -ms-flex: auto;\n          flex: auto;\n}\n.room .box .right .head {\n  border-radius: 6px 6px 0 0;\n  height: 72px;\n  background: #7187fe;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 20px 40px;\n  font-size: 24px;\n  color: #fff;\n}\n.room .box .right .textarea {\n  padding-right: 2px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.room .box .right .foot {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  padding: 10px 36px;\n  text-align: right;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/room/roomText.vue?vue&type=style&index=0&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-2!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/room/roomText.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".room-text .open-message {\n  position: fixed;\n  z-index: 1000;\n  cursor: pointer;\n  bottom: 20px;\n  width: 80px;\n  right: 0;\n  height: 50px;\n  text-align: center;\n  line-height: 50px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  border-radius: 40px 0 0 40px;\n  background: #3A71A8;\n  color: #fff;\n}\n.room-text .open-message .unread {\n  color: #f56c6c;\n}\n.room-text .el-drawer__body {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: nowrap column;\n          flex-flow: nowrap column;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.room-text .el-drawer__body .scroll-view {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  height: 0;\n  -webkit-box-flex: 1;\n      -ms-flex: auto;\n          flex: auto;\n  width: 100%;\n  background: #f5f5f5;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.room-text .el-drawer__body .scroll-view .content-box {\n  padding: 10px;\n}\n.room-text .el-drawer__body .scroll-view .content-box .center {\n  text-align: center;\n  font-size: 12px;\n  color: #333;\n  margin-bottom: 4px;\n}\n.room-text .el-drawer__body .scroll-view .content-box .right {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: nowrap row;\n          flex-flow: nowrap row;\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n.room-text .el-drawer__body .scroll-view .content-box .right .file .file-info {\n  margin-right: 10px;\n}\n.room-text .el-drawer__body .scroll-view .content-box .right .image {\n  text-align: right;\n}\n.room-text .el-drawer__body .scroll-view .content-box .left {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: nowrap row;\n          flex-flow: nowrap row;\n}\n.room-text .el-drawer__body .scroll-view .content-box .left .file .file-info {\n  margin-left: 10px;\n}\n.room-text .el-drawer__body .scroll-view .content-box .item {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  width: 70%;\n  border-radius: 4px;\n  position: relative;\n}\n.room-text .el-drawer__body .scroll-view .content-box .item:before {\n  content: \" \";\n  width: 10px;\n  height: 10px;\n  background-color: #fff;\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n  position: absolute;\n  top: 14px;\n}\n.room-text .el-drawer__body .scroll-view .content-box .right .item {\n  margin-right: 10px;\n}\n.room-text .el-drawer__body .scroll-view .content-box .right .item:before {\n  right: -5px;\n}\n.room-text .el-drawer__body .scroll-view .content-box .left .item {\n  margin-left: 10px;\n}\n.room-text .el-drawer__body .scroll-view .content-box .left .item:before {\n  left: -5px;\n}\n.room-text .el-drawer__body .scroll-view .content-box .text {\n  padding: 8px;\n  background-color: #94ed6a;\n  font-size: 14px;\n  color: #000;\n  line-height: 22px;\n  word-break: break-all;\n}\n.room-text .el-drawer__body .scroll-view .content-box .text:before {\n  background-color: #94ed6a;\n}\n.room-text .el-drawer__body .scroll-view .content-box .image img {\n  max-width: 100%;\n  border-radius: 4px;\n}\n.room-text .el-drawer__body .scroll-view .content-box .image:before {\n  width: 0;\n  height: 0;\n}\n.room-text .el-drawer__body .scroll-view .content-box .file {\n  padding: 8px;\n  background-color: #fff;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  height: 70px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 60%;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.room-text .el-drawer__body .scroll-view .content-box .file .file-info {\n  -webkit-box-flex: 1;\n      -ms-flex: auto;\n          flex: auto;\n  width: 0;\n}\n.room-text .el-drawer__body .scroll-view .content-box .file .file-info .name {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-size: 18px;\n  color: #000;\n}\n.room-text .el-drawer__body .scroll-view .content-box .file .file-info .size {\n  font-size: 14px;\n  color: #333;\n  text-transform: uppercase;\n}\n.room-text .el-drawer__body .scroll-view .content-box .file img {\n  width: 38px;\n  height: 54px;\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n}\n.room-text .el-drawer__body .scroll-view .avatar {\n  height: 38px;\n}\n.room-text .el-drawer__body .send-message {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n  height: 220px;\n  width: 100%;\n  background-color: #fff;\n  padding: 20px 40px;\n}\n.room-text .el-drawer__body .send-message .tool-box {\n  font-size: 26px;\n  color: #7c7c7c;\n}\n.room-text .el-drawer__body .send-message .send {\n  margin-top: 10px;\n  text-align: right;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/room/index.vue?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--8-oneOf-1-0!./node_modules/css-loader??ref--8-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-2!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/room/index.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--8-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--8-oneOf-1-2!../../../node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/room/index.vue?vue&type=style&index=0&lang=scss&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("64a0225a", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(/*! !../../../node_modules/css-loader??ref--8-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--8-oneOf-1-2!../../../node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/room/index.vue?vue&type=style&index=0&lang=scss&", function() {
     var newContent = __webpack_require__(/*! !../../../node_modules/css-loader??ref--8-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--8-oneOf-1-2!../../../node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/room/index.vue?vue&type=style&index=0&lang=scss&");
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/room/roomText.vue?vue&type=style&index=0&lang=scss&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--8-oneOf-1-0!./node_modules/css-loader??ref--8-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-2!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/room/roomText.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--8-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--8-oneOf-1-2!../../../node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./roomText.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/room/roomText.vue?vue&type=style&index=0&lang=scss&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("34c3be81", content, false, {"sourceMap":false,"shadowMode":false});
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(/*! !../../../node_modules/css-loader??ref--8-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--8-oneOf-1-2!../../../node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./roomText.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/room/roomText.vue?vue&type=style&index=0&lang=scss&", function() {
     var newContent = __webpack_require__(/*! !../../../node_modules/css-loader??ref--8-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--8-oneOf-1-2!../../../node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./roomText.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/room/roomText.vue?vue&type=style&index=0&lang=scss&");
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/views/room/bg.png":
/*!*******************************!*\
  !*** ./src/views/room/bg.png ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/bg.e6c6bde2.png";

/***/ }),

/***/ "./src/views/room/index.vue":
/*!**********************************!*\
  !*** ./src/views/room/index.vue ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_3af1f590___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=3af1f590& */ "./src/views/room/index.vue?vue&type=template&id=3af1f590&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./src/views/room/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&lang=scss& */ "./src/views/room/index.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_3af1f590___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_3af1f590___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__(/*! ./node_modules/vue-hot-reload-api/dist/index.js */ "./node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!api.isRecorded('3af1f590')) {
      api.createRecord('3af1f590', component.options)
    } else {
      api.reload('3af1f590', component.options)
    }
    module.hot.accept(/*! ./index.vue?vue&type=template&id=3af1f590& */ "./src/views/room/index.vue?vue&type=template&id=3af1f590&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _index_vue_vue_type_template_id_3af1f590___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=3af1f590& */ "./src/views/room/index.vue?vue&type=template&id=3af1f590&");
(function () {
      api.rerender('3af1f590', {
        render: _index_vue_vue_type_template_id_3af1f590___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _index_vue_vue_type_template_id_3af1f590___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
component.options.__file = "src/views/room/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/room/index.vue?vue&type=script&lang=js&":
/*!***********************************************************!*\
  !*** ./src/views/room/index.vue?vue&type=script&lang=js& ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../../node_modules/babel-loader/lib!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/room/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/room/index.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************************!*\
  !*** ./src/views/room/index.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader??ref--8-oneOf-1-0!../../../node_modules/css-loader??ref--8-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--8-oneOf-1-2!../../../node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/room/index.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/views/room/index.vue?vue&type=template&id=3af1f590&":
/*!*****************************************************************!*\
  !*** ./src/views/room/index.vue?vue&type=template&id=3af1f590& ***!
  \*****************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cache_loader_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_e948198a_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_3af1f590___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!cache-loader?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"e948198a-vue-loader-template"}!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=3af1f590& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"e948198a-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/room/index.vue?vue&type=template&id=3af1f590&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _cache_loader_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_e948198a_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_3af1f590___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _cache_loader_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_e948198a_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_3af1f590___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/views/room/roomText.vue":
/*!*************************************!*\
  !*** ./src/views/room/roomText.vue ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _roomText_vue_vue_type_template_id_0210149c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./roomText.vue?vue&type=template&id=0210149c& */ "./src/views/room/roomText.vue?vue&type=template&id=0210149c&");
/* harmony import */ var _roomText_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./roomText.vue?vue&type=script&lang=js& */ "./src/views/room/roomText.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _roomText_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./roomText.vue?vue&type=style&index=0&lang=scss& */ "./src/views/room/roomText.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _roomText_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _roomText_vue_vue_type_template_id_0210149c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _roomText_vue_vue_type_template_id_0210149c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__(/*! ./node_modules/vue-hot-reload-api/dist/index.js */ "./node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!api.isRecorded('0210149c')) {
      api.createRecord('0210149c', component.options)
    } else {
      api.reload('0210149c', component.options)
    }
    module.hot.accept(/*! ./roomText.vue?vue&type=template&id=0210149c& */ "./src/views/room/roomText.vue?vue&type=template&id=0210149c&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _roomText_vue_vue_type_template_id_0210149c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./roomText.vue?vue&type=template&id=0210149c& */ "./src/views/room/roomText.vue?vue&type=template&id=0210149c&");
(function () {
      api.rerender('0210149c', {
        render: _roomText_vue_vue_type_template_id_0210149c___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _roomText_vue_vue_type_template_id_0210149c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
component.options.__file = "src/views/room/roomText.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/room/roomText.vue?vue&type=script&lang=js&":
/*!**************************************************************!*\
  !*** ./src/views/room/roomText.vue?vue&type=script&lang=js& ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_roomText_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../../node_modules/babel-loader/lib!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./roomText.vue?vue&type=script&lang=js& */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/room/roomText.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_roomText_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/room/roomText.vue?vue&type=style&index=0&lang=scss&":
/*!***********************************************************************!*\
  !*** ./src/views/room/roomText.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_roomText_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader??ref--8-oneOf-1-0!../../../node_modules/css-loader??ref--8-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--8-oneOf-1-2!../../../node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./roomText.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/room/roomText.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_roomText_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_roomText_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_roomText_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_roomText_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_roomText_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/views/room/roomText.vue?vue&type=template&id=0210149c&":
/*!********************************************************************!*\
  !*** ./src/views/room/roomText.vue?vue&type=template&id=0210149c& ***!
  \********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cache_loader_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_e948198a_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_roomText_vue_vue_type_template_id_0210149c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!cache-loader?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"e948198a-vue-loader-template"}!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./roomText.vue?vue&type=template&id=0210149c& */ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"e948198a-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/room/roomText.vue?vue&type=template&id=0210149c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _cache_loader_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_e948198a_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_roomText_vue_vue_type_template_id_0210149c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _cache_loader_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_e948198a_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_roomText_vue_vue_type_template_id_0210149c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);