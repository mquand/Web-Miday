'use client';
import { useState } from 'react';
import { FaLock, FaLockOpen, FaKey, FaHeart, FaPlus, FaTimes, FaShieldAlt } from 'react-icons/fa';

export default function SecretLoveVault({
  vaultData,
  onUpdateVault,
  onBurstHearts,
}) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [errorShake, setErrorShake] = useState(false);
  const [isChangePinOpen, setIsChangePinOpen] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  const currentPasscode = vaultData?.passcode || '1002';

  const handleKeyPress = (num) => {
    if (pinInput.length >= 4) return;
    const nextPin = pinInput + num;
    setPinInput(nextPin);

    // Khi gõ đủ 4 số, tự động kiểm tra
    if (nextPin.length === 4) {
      if (nextPin === currentPasscode) {
        setIsUnlocked(true);
        setPinInput('');
        if (onBurstHearts) onBurstHearts();
      } else {
        setErrorShake(true);
        setTimeout(() => {
          setErrorShake(false);
          setPinInput('');
        }, 600);
      }
    }
  };

  const handleClear = () => {
    setPinInput('');
  };

  const handleLockAgain = () => {
    setIsUnlocked(false);
    setPinInput('');
  };

  const handleChangePin = (e) => {
    e.preventDefault();
    if (newPin.length !== 4 || isNaN(newPin)) {
      alert('Mật mã mới phải gồm 4 chữ số nhé!');
      return;
    }
    onUpdateVault({
      ...vaultData,
      passcode: newPin,
    });
    alert(`Đã đổi mật mã thành công: ${newPin}`);
    setIsChangePinOpen(false);
    setNewPin('');
  };

  const handleAddSecretNote = (e) => {
    e.preventDefault();
    if (!newNote.title || !newNote.content) return;
    const updatedItems = [
      ...(vaultData?.secretItems || []),
      {
        id: Date.now(),
        title: newNote.title,
        content: newNote.content,
        date: new Date().toLocaleDateString('vi-VN'),
      }
    ];
    onUpdateVault({
      ...vaultData,
      secretItems: updatedItems,
    });
    setNewNote({ title: '', content: '' });
    setIsAddNoteOpen(false);
  };

  return (
    <section id="vault" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold px-3 py-1 rounded-full bg-pink-50 mb-3">
            <FaShieldAlt className="text-xs" />
            <span>Chốn Riêng Tư Tuyệt Mật</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight" data-aos="fade-up">
            Chiếc Hộp Bí Mật
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto" data-aos="fade-up" data-aos-delay="80">
            Nơi cất giữ những lời thì thầm, kỷ niệm đặc biệt và bí mật nhỏ chỉ hai đứa biết
          </p>
        </div>

        {/* Vault Main Container */}
        <div
          className="max-w-xl mx-auto bg-[#FFFDFE] border border-pink-100 rounded-3xl p-6 md:p-10 shadow-lg relative overflow-hidden"
          data-aos="zoom-in"
        >
          {!isUnlocked ? (
            /* Locked State with PIN Pad */
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-pink-50 border border-pink-200 text-primary flex items-center justify-center text-2xl mb-4 shadow-sm animate-pulse">
                <FaLock />
              </div>

              <h3 className="font-bold text-gray-800 text-lg mb-1">Nhập Mật Mã Tình Yêu</h3>
              <p className="text-xs text-gray-400 mb-6">Gợi ý: Ngày kỷ niệm của hai bạn (4 chữ số)</p>

              {/* PIN Dots Display */}
              <div
                className={`flex gap-4 mb-8 transition-transform ${
                  errorShake ? 'animate-bounce text-red-500' : ''
                }`}
              >
                {[0, 1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className={`w-4 h-4 rounded-full border-2 transition-all ${
                      pinInput.length > idx
                        ? 'bg-primary border-primary scale-125'
                        : 'border-pink-200 bg-white'
                    }`}
                  ></div>
                ))}
              </div>

              {/* Number Keypad */}
              <div className="grid grid-cols-3 gap-3 w-60">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleKeyPress(num.toString())}
                    className="h-14 rounded-2xl bg-white border border-gray-100 hover:border-pink-300 hover:bg-pink-50/50 text-gray-800 font-bold text-lg shadow-xs active:scale-95 transition-all"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={handleClear}
                  className="h-14 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-gray-100 text-gray-500 font-semibold text-xs active:scale-95 transition-all"
                >
                  Xóa
                </button>
                <button
                  onClick={() => handleKeyPress('0')}
                  className="h-14 rounded-2xl bg-white border border-gray-100 hover:border-pink-300 hover:bg-pink-50/50 text-gray-800 font-bold text-lg shadow-xs active:scale-95 transition-all"
                >
                  0
                </button>
                <div className="h-14 flex items-center justify-center text-primary text-sm">
                  <FaHeart className="animate-pulse" />
                </div>
              </div>
            </div>
          ) : (
            /* Unlocked State - Secret Content */
            <div className="animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-pink-100 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-base">
                    <FaLockOpen />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-base">Kho Báu Đã Mở Khóa!</h3>
                    <span className="text-[11px] text-gray-400">Không gian bí mật của hai bạn</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsChangePinOpen(true)}
                    className="text-xs text-gray-500 hover:text-primary p-2 flex items-center gap-1"
                    title="Đổi mã PIN"
                  >
                    <FaKey className="text-[10px]" />
                    <span>Đổi mã</span>
                  </button>
                  <button
                    onClick={handleLockAgain}
                    className="bg-gray-100 hover:bg-pink-50 hover:text-primary text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                  >
                    Khóa lại 🔒
                  </button>
                </div>
              </div>

              {/* Secret Message */}
              <div className="bg-pink-50/60 border border-pink-100 rounded-2xl p-5 mb-6">
                <div className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                  <FaHeart className="text-xs" />
                  <span>Lời Nhắn Tuyệt Mật</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed italic">
                  "{vaultData?.secretMessage}"
                </p>
              </div>

              {/* Secret Items List */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Những Bí Mật Của Hai Đứa ({(vaultData?.secretItems || []).length})
                  </h4>
                  <button
                    onClick={() => setIsAddNoteOpen(true)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    <FaPlus className="text-[10px]" />
                    <span>Thêm bí mật mới</span>
                  </button>
                </div>

                {(vaultData?.secretItems || []).map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-100 p-4 rounded-xl shadow-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-gray-800 text-sm">{item.title}</span>
                      <span className="text-[10px] text-gray-400">{item.date}</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Change PIN Modal */}
      {isChangePinOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsChangePinOpen(false)}
              className="absolute top-4 right-4 text-gray-400 p-2"
            >
              <FaTimes />
            </button>
            <h3 className="font-bold text-gray-800 text-base mb-1">Đổi Mật Mã Hộp Bí Mật</h3>
            <p className="text-xs text-gray-400 mb-4">Nhập mã PIN 4 chữ số mới</p>
            <form onSubmit={handleChangePin} className="space-y-4">
              <input
                type="password"
                maxLength={4}
                required
                placeholder="Ví dụ: 1002"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                className="w-full text-center text-2xl font-bold tracking-widest border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-primary"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsChangePinOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-500"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-pink-600 text-white px-5 py-2 rounded-full text-xs font-semibold"
                >
                  Lưu mật mã
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Secret Note Modal */}
      {isAddNoteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsAddNoteOpen(false)}
              className="absolute top-4 right-4 text-gray-400 p-2"
            >
              <FaTimes />
            </button>
            <h3 className="font-bold text-gray-800 text-base mb-1">Thêm Kỷ Niệm Bí Mật</h3>
            <p className="text-xs text-gray-400 mb-4">Chỉ người mở được hộp mới đọc được</p>
            <form onSubmit={handleAddSecretNote} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tiêu đề</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Lời hứa bí mật, Kỷ niệm hôm nay..."
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Nội dung</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Viết điều bạn muốn gửi gắm bí mật..."
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-primary"
                ></textarea>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddNoteOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-500"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-pink-600 text-white px-5 py-2 rounded-full text-xs font-semibold"
                >
                  Cất vào hộp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
