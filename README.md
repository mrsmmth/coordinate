# COORDINATE v0.3.5

本編音声再生修正版。

- 欠落していたBPM拍長計算を追加
- 診断用テスト音を削除
- 再生ボタンから本編を直接再生
- AudioContext起動後にイベントをスケジュール
- エラー内容を画面表示


## v0.3.5 Backing Engine
- Default backing changed to a natural Bass + Chord pattern.
- Left-hand and right-hand generation are separated.
- Chord tones are the primary note pool; Freedom only permits rare diatonic passing tones.
- Range Motion moves among chord tones and octaves instead of chromatic transposition.
- Variation now changes voicing and phrase choices.
- Pattern cards now drive actual performance recipes.
- 6/8 playback and MIDI timing use eighth-note pulses.
